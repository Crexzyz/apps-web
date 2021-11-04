"use strict";

const db = require('../models/index.js');
const PostsHelper = require("./PostsHelper");
const multer = require('multer');
const User = db.User;
const Post = db.Post;
const Category = db.Category;
const PostCategory = db.sequelize.models.PostCategory;

exports.form = async (req, res) => {
    const categories = await Category.findAll();
    for(const category of categories) {
        category.decoded = decodeURIComponent(category.name);
    }

    res.render('post_form', {
        title: 'Create post',
        categories: categories
    });
}

exports.create = async (req, res) => {
    // TODO: Trim fixed-length fields
    // TODO: Validate category existence/handle sequelize errors

    let image = '';
    if(req.file !== undefined && req.file.filename !== undefined){
        image = req.file.filename;
    }

    const post = await Post.create({
        title: req.body.title,
        abstract: req.body.abstract,
        text: req.body.text,
        image: image,
        UserId: req.user.id,
    });

    // TODO: Handle multiple categories
    const postCategory = await PostCategory.create({
        PostId: post.id,
        CategoryName: req.body.category
    })

    res.redirect('/posts');
}

exports.details = async (req, res) => {
    const postId = req.params.id;
    const post = await Post.findByPk(postId);
    const comments = await post.getComments();
    let userId = '';
    if(req.user !== undefined) {
        userId = req.user.id;
    }
    const authLevel = await PostsHelper.getAuthLevel(post.dataValues, userId);
    
    res.render('post', {
        title: 'Post',
        post: post.dataValues,
        comments: comments,
        authLevel: authLevel
    });
}

exports.list = async (req, res) => {
    const postsData = await PostsHelper.getPostsPaged(req.query.page);

    // TODO: Handle 300+ chars in abstract

    res.render('posts', {
        title: 'Posts',
        header: 'All posts',
        posts: postsData.posts,
        pages: postsData.pages,
        active: postsData.page,
        categories: postsData.categories,
        users: postsData.users
    });
}

exports.listCategory = async (req, res) => {
    const category = req.params.name;
    const categoryEncoded = encodeURIComponent(category);

    const postsData = await PostsHelper.getPostsPaged(req.query.page, {}, [{
            model: Category,
            where: {name: categoryEncoded},
        }]
    );

    res.render('posts', {
        title: category,
        header: 'Category: ' + category,
        posts: postsData.posts,
        pages: postsData.pages,
        active: postsData.page,
        categories: postsData.categories,
        users: postsData.users
    });
}

exports.listUser = async (req, res) => {
    const userId = req.params.id;

    const user = await User.findByPk(userId);
    const postsData = await PostsHelper.getPostsPaged(req.query.page, { UserId: userId });

    res.render('posts', {
        title: user.dataValues.name,
        header: 'User: ' + user.dataValues.name,
        posts: postsData.posts,
        pages: postsData.pages,
        active: postsData.page,
        categories: postsData.categories,
        users: postsData.users
    });
}
