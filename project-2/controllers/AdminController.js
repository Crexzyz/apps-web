"use strict";


const db = require('../models/index.js');
const PostsHelper = require("./PostsHelper");
const User = db.User;
const Role = db.Role;
const Post = db.Post;
const Category = db.Category;

exports.users = async function (req, res) {
    const users = await User.findAll({raw: true});
    const roles = await Role.findAll({raw: true});
    
    res.render('admin_users', {
        title: 'Users',
        users: users,
        roles: roles
    });
}

exports.deleteUser = async function (req, res) {
    if(req.user.id !== req.body.id) {
        await User.destroy({
            where: {
                id: req.body.id
            }
        })
        .then(exports.users(req, res))
        .catch(exports.users(req, res));
    }

    
}

exports.updateUser = async function (req, res) {
    await User.update({RoleName: req.body.role}, {
        where: {
            id: req.body.id
        }
    })

    exports.users(req, res)
}

exports.categories = async function (req, res) {
    const result = await Category.findAll({
        attributes: [
            'name',
            [db.sequelize.fn('COUNT', db.sequelize.col('Posts.id')), 'CategoryCount']
        ],
        include: [{
            model: Post,
            through: {attributes: []}
        }],
        group: ['name'],
        raw: true
    });

    for(const category of result) {
        category.decoded = decodeURIComponent(category.name);
    }

    res.render('admin_categories', {
        title: 'Categories',
        categories: result
    });
}

exports.createCategory = async function (req, res) {
    const category = await Category.create({
        name: encodeURIComponent(req.body.name)
    });

    exports.categories(req, res);
}

exports.deleteCategory = async function (req, res) {
    await Category.destroy({
        where: {
            name: decodeURIComponent(req.body.name)
        }
    });

    exports.categories(req, res);
}

exports.posts = async function (req, res) {
    const postsData = await PostsHelper.getPostsPaged(req.query.page);

    res.render('admin_posts', {
        title: 'Posts',
        posts: postsData.posts,
        pages: postsData.pages,
        active: postsData.page,
    });
}

exports.postDetails = async function (req, res) {
    
}

exports.deletePost = async function (req, res) {
    await PostsHelper.deletePost(req.body.id);

    exports.posts(req, res);
}
