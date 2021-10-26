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
    let page = req.query.page;
    let offset = typeof page == 'undefined' ? 0 : (page - 1) * 5;

    const posts = await Post.findAndCountAll({
        limit: 5,
        offset: offset
    });

    res.render('posts', {
        title: 'Posts',
        posts: posts.rows
    });
}

exports.details = async (req, res) => {
    
}
