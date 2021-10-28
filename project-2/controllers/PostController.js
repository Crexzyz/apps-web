"use strict";

const Post = require('../models/index.js').Post;
const User = require('../models/index.js').User;
const Category = require('../models/index.js').Category;

exports.form = async (req, res) => {
    const categories = await Category.findAll();

    res.render('post_form', {
        title: 'Create post',
        categories: categories
    });
}

exports.create = async (req, res) => {
    // TODO: Trim fixed-length fields
    // TODO: Validate category existence/handle sequelize errors
    const post = await Post.create({
        title: req.body.title,
        abstract: req.body.abstract,
        text: req.body.text,
        image: req.body.image, // TODO: handle multipart/form-data
        UserId: req.user.id,
        CategoryName: req.body.category
    });

    res.redirect('/posts');
}

exports.list = async (req, res) => {
    let page = 0;

    if(typeof req.query.page === 'undefined') {
        page = 1;
    }
    else {
        page = parseInt(req.query.page);
        page = isNaN(page) ? 1 : page;
    }

    let offset = (page - 1) * 5;

    const posts = await Post.findAndCountAll({
        limit: 5,
        offset: offset,
        include: User
    });

    const count = Math.ceil(posts.count / 5);
    const startPage = page - 5 < 1 ? 1 : page - 5;
    const endPage = page + 5 > count ? count : page + 5;
    const pages = Array(endPage - startPage + 1).fill().map((_, idx) => startPage + idx);

    const categories = await Category.findAll();
    const users = await User.findAll();

    for(const post of posts.rows) {
        post.commentsCount = await post.countComments();
    }
    
    // TODO: Handle 300+ chars in abstract

    res.render('posts', {
        title: 'Posts',
        posts: posts.rows,
        pages: pages,
        active: page,
        categories: categories,
        users: users
    });
}

exports.details = async (req, res) => {
    const postId = req.params.id;
    const post = await Post.findByPk(postId);
    const comments = await post.getComments();

    res.render('post', {
        title: 'Post',
        post: post.dataValues,
        comments: comments
    });
}
