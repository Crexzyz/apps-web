"use strict";

const Post = require('../models/index.js').Post;
const User = require('../models/index.js').User;
const Category = require('../models/index.js').Category;

exports.form = (req, res) => {
    res.render('post_form', {title: 'Create post'});
}

exports.create = async (req, res) => {
    await Post.create({
        title: req.body.title,
        abstract: req.body.abstract,
        text: req.body.text,
        image: req.body.image,
        UserId: req.user.id,
        CategoryName: 'PHP' // TODO: Un-hardcode
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
    
}
