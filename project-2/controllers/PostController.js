"use strict";

const Post = require('../models/index.js').Post;
const User = require('../models/index.js').User;
const Category = require('../models/index.js').Category;
const PostsHelper = require("./PostsHelper");

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
    const postsData = await PostsHelper.getPostsPaged(req.query.page);
    const categories = await Category.findAll();
    const users = await User.findAll();

    for(const category of categories) {
        category.decoded = decodeURIComponent(category.name);
    }

    for(const post of postsData.posts) {
        post.commentsCount = await post.countComments();
    }
    
    // TODO: Handle 300+ chars in abstract

    res.render('posts', {
        title: 'Posts',
        posts: postsData.posts,
        pages: postsData.pages,
        active: postsData.page,
        categories: categories,
        users: users
    });
}

exports.listCategory = async (req, res) => {
    const category = req.params.name;

    const postsData = await PostsHelper.getPostsPaged(req.query.page, { CategoryName: category });

    res.render('category', {
        title: category,
        category: category,
        posts: postsData.posts,
        pages: postsData.pages,
        active: postsData.page,
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
