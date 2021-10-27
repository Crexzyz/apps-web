"use strict";

const passport = require("passport");
const querystring = require("querystring");
const User = require('../models/index.js').User;

require("dotenv").config();

exports.login = (req, res) => {
    res.redirect("/");
}

exports.callback = (req, res, next) => {
    passport.authenticate("auth0", (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect("/login");
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            const returnTo = req.session.returnTo;
            delete req.session.returnTo;

            const { _raw, _json, ...userProfile } = req.user;
            validateLocalUser(userProfile);

            res.redirect(returnTo || "/");
        });
    })(req, res, next);
}

exports.logout = (req, res) => {
    req.logOut();

    let returnTo = req.protocol + "://" + req.hostname;
    const port = req.connection.localPort;
  
    if (port !== undefined && port !== 80 && port !== 443) {
      returnTo =
        process.env.NODE_ENV === "production"
          ? `${returnTo}/`
          : `${returnTo}:${port}/`;
    }
  
    const logoutURL = new URL(
      `https://${process.env.AUTH0_DOMAIN}/v2/logout`
    );
  
    const searchString = querystring.stringify({
      client_id: process.env.AUTH0_CLIENT_ID,
      returnTo: returnTo
    });
    logoutURL.search = searchString;
  
    res.redirect(logoutURL);
}

async function validateLocalUser(userProfile) {
    const [user, created] = await User.findOrCreate({
        where: {id: userProfile.id},
        defaults: {
            name: userProfile.name.givenName,
            lastName: userProfile.name.familyName,
            RoleName: 'User'
        }
    });
}
