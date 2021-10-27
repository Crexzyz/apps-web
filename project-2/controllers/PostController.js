"use strict";

const Post = require('../models/index.js').Post;
const Sequelize = require('sequelize');

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
    let page = typeof req.query.page == 'undefined' ? 1 : req.query.page;
    let offset = (page - 1) * 5;

    const posts = await Post.findAndCountAll({
        limit: 5,
        offset: offset
    });

    const count = Math.ceil(posts.count / 5);
    const startPage = page - 5 < 1 ? 1 : page - 5;
    const endPage = page + 5 > count ? count : page + 5;
    const pages = Array(endPage - startPage + 1).fill().map((_, idx) => startPage + idx)
    
    res.render('posts', {
        title: 'Posts',
        posts: posts.rows,
        pages: pages
    });
}

exports.details = async (req, res) => {
    
}
