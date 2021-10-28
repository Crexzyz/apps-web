"use strict";

const User = require('../models/index.js').User;

exports.isAuthenticated = function (req, res, next) {
    res.locals.isAuthenticated = req.isAuthenticated();
    next();
}

exports.isUserAdmin = async function (req, res, next) {
    if(typeof req.user === 'undefined') {
        res.locals.isAdmin = false;
    }
    else {
        const { _raw, _json, ...userProfile } = req.user;
        const id = userProfile.id;
    
        const role = await User.findByPk(id, {
            attributes: ['RoleName'],
            raw: true
        });

        res.locals.isAdmin = (role.RoleName === 'Admin');
    }

    next();
}
