"use strict";

const User = require('../models/index.js').User;

exports.isAuthenticated = function (req, res, next) {
    res.locals.isAuthenticated = req.isAuthenticated();
    next();
}

exports.isUserAdmin = async function (req, res, next) {
    if(req.user === undefined) {
        res.locals.isAdmin = false;
    }
    else {
        const { _raw, _json, ...userProfile } = req.user;
        const id = userProfile.id;
    
        const role = await User.findByPk(id, {
            attributes: ['RoleName'],
            raw: true
        });

        if(role === null || role === undefined) {
            res.locals.isAuthenticated = false;
        }
        else {
            res.locals.isAdmin = role.RoleName === 'Admin';
        }
    }

    next();
}
