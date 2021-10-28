"use strict";

const User = require('../models/index.js').User;
const Role = require('../models/index.js').Role;

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
    await User.destroy({
        where: {
            id: req.body.id
        }
    })

    exports.users(req, res)
}

exports.updateUser = async function (req, res) {
    await User.update({RoleName: req.body.role}, {
        where: {
            id: req.body.id
        }
    })

    exports.users(req, res)
}