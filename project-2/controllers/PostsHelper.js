"use strict";

const db = require('../models/index.js');
const fs = require('fs');
const path = require('path');
const User = db.User;
const Post = db.Post;
const Category = db.Category;

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
        order: [['date', 'ASC']],
        limit: 5,
        offset: offset,
    });

    const count = Math.ceil(posts.count / 5);
    const startPage = page - 5 < 1 ? 1 : page - 5;
    const endPage = page + 5 > count ? count : page + 5;
    const pages = Array(endPage - startPage + 1).fill().map((_, idx) => startPage + idx);

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

exports.deletePost = async function(id) {
    const post = await Post.findOne({
        where: {
            id: id
        },
        attributes: ['image'],
        raw: true
    })

    const imagePath = path.join(__dirname, "../public/images", post.image);

    try {
        fs.unlinkSync(imagePath);
    } catch(error) {
        console.error(error);
    }

    await Post.destroy({
        where: {
            id: id
        }
    })
}

exports.getAuthLevel = async function(postData, userId) {
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
