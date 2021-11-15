"use strict";

const db = require('../models/index.js');
const fs = require('fs');
const path = require('path');
const User = db.User;
const Post = db.Post;
const Category = db.Category;

const MAX_ABSTRACT_DISPLAY_LENGTH = 300;

exports.getPostsPaged = async function (pageParam, whereOptions={}, includeOptions=[]) {
    const categories = await Category.findAll();
    const users = await User.findAll();
    let page = 0;

    if(typeof pageParam === 'undefined') {
        page = 1;
    }
    else {
        page = parseInt(pageParam);
        page = isNaN(page) ? 1 : page;
    }

    let offset = (page - 1) * 5;


    const include = [{model: User}];
    include.push(...includeOptions);
    const posts = await Post.findAndCountAll({
        where: whereOptions,
        include: include,
        order: [['date', 'DESC']],
        limit: 5,
        offset: offset,
    });

    const count = Math.ceil(posts.count / 5);
    const startPage = page - 5 < 1 ? 1 : page - 5;
    const endPage = page + 5 > count ? count : page + 5;
    const pages = Array(endPage - startPage + 1).fill().map((_, idx) => startPage + idx);

    for(const post of posts.rows) {
        const trimmedAbstract = post.dataValues.abstract.substring(0, MAX_ABSTRACT_DISPLAY_LENGTH);
        post.dataValues.abstract = trimmedAbstract;
    }

    for(const post of posts.rows) {
        post.commentsCount = await post.countComments();
    }

    for(const category of categories) {
        category.decoded = decodeURIComponent(category.name);
    }

    return {
        pages: pages,
        posts: posts.rows,
        page: page,
        users: users,
        categories: categories
    }
}

exports.getPostsPagedByCategory = async function(page, categoryName) {
    const filter = {
        model: Category,
        where: {name: categoryName}
    }
    return await this.getPostsPaged(page, {}, [filter])
}

exports.getPostsPagedByUser = async function(page, userId) {
    return await this.getPostsPaged(page, {UserId: userId});
}

exports.deleteImage = function(imageName) {
    const imagePath = path.join(__dirname, "../public/images", imageName);

    try {
        fs.unlinkSync(imagePath);
    } catch(error) {
        console.error(error);
    }
}

exports.deletePost = async function(id) {
    const post = await Post.findOne({
        where: {
            id: id
        },
        attributes: ['image'],
        raw: true
    })

    exports.deleteImage(post.image);

    await Post.destroy({
        where: {
            id: id
        }
    })
}

exports.getAuthLevel = async function(postData, userId) {
    if(userId === undefined || userId === null || userId === '') {
        return 'guest';
    }

    if(postData.UserId === userId) {
        return 'author';
    }

    const role = await User.findOne({
        where: {
            id: userId
        },
        attributes: ['RoleName'],
        raw: true
    })

    if(role.RoleName === 'Admin') {
        return 'admin';
    }

    return 'guest';
}

exports.associateCategories = async function(post, categories) {
    if(categories === undefined || categories == null) {
        return
    }

    for(const categoryText of categories) {
        const category = await Category.findByPk(categoryText);
        if(category === undefined || category === null) {
            continue
        }

        await post.addCategory(category);
    }
}
