"use strict";

const db = require('../models/index.js');
const PostsHelper = require("./PostsHelper");
const User = db.User;
const Post = db.Post;
const Category = db.Category;
const PostCategory = db.sequelize.models.PostCategory;

const MAX_TITLE_LENGTH = 100;
const MAX_ABSTRACT_LENGTH = 400;

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
    const title = req.body.title.substring(0, MAX_TITLE_LENGTH);
    const abstract = req.body.abstract.substring(0, MAX_ABSTRACT_LENGTH);

    let image = '';
    if(req.file !== undefined && req.file.filename !== undefined){
        image = req.file.filename;
    }

    const post = await Post.create({
        title: title,
        abstract: abstract,
        text: req.body.text,
        image: image,
        UserId: req.user.id,
    });

    await PostsHelper.associateCategories(post, req.body.categories);

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

exports.listJson = async (req, res) => {
    const page = req.query.page;
    const category = req.query.category;
    const user = req.query.user;

    let postsData = null;
    
    if(category !== undefined && category !== null) {
        postsData = await PostsHelper.getPostsPagedByCategory(page, category);
    }
    else if(user !== undefined && user !== null) {
        postsData = await PostsHelper.getPostsPagedByUser(page, user);
    }
    else {
        postsData = await PostsHelper.getPostsPaged(page);
    }
    
    res.render('includes/post_section', {
        posts: postsData.posts,
        pages: postsData.pages,
        active: postsData.page
    });
}


exports.list = async (req, res) => {
    const postsData = await PostsHelper.getPostsPaged(req.query.page);

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

exports.editShow = async (req, res) => {
    const postId = req.params.id;
    const post = await Post.findOne({
        where: {id: postId},
        include: [{
            model: Category,
        }],
    });

    const categories = await Category.findAll();
    for(const category of categories) {
        category.decoded = decodeURIComponent(category.name);
        for(const postCategory of post.dataValues.Categories) {
            if(category.name === postCategory.name) {
                category.selected = true;
            }
        }
    }
    
    res.render('post_edit', {
        title: 'Edit post',
        post: post,
        categories: categories
    });
}

exports.editSave = async (req, res) => {
    const postId = req.params.id;
    const originalPost = await Post.findOne({
        where: {id: postId},
        include: [{model: Category}]
    });

    const originalImageName = originalPost.dataValues.image;
    
    let image = '';
    if(req.file !== undefined && req.file.filename !== undefined){
        image = req.file.filename;
    }

    const modifiedPost = {
        title: req.body.title,
        abstract: req.body.abstract,
        text: req.body.text,
    };

    if(image !== '') {
        modifiedPost['image'] = image;
    }

    if(originalImageName !== '' && image !== '' && image !== originalImageName) {
        PostsHelper.deleteImage(originalImageName);
    }

    const post = await Post.findByPk(postId);
    await post.update(modifiedPost);

    // Updating associations is not supported by Sequelize currently.
    // See https://github.com/sequelize/sequelize/issues/11836

    await PostCategory.destroy({where: {PostId: postId}});
    await PostsHelper.associateCategories(post, req.body.categories);
    await post.save();

    exports.details(req, res);
}

exports.listCategory = async (req, res) => {
    const category = req.params.name;
    const categoryEncoded = encodeURIComponent(category);

    const postsData = await PostsHelper.getPostsPagedByCategory(req.query.page, category);

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
    const postsData = await PostsHelper.getPostsPagedByUser(req.query.page, userId);

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
