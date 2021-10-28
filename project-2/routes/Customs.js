"use strict";

// TODO: Move logic to auth controller

exports.loggedInOnly = (req, res, next) => {
  if (req.user) {
    return next();
  }
  req.session.returnTo = req.originalUrl;
  res.redirect("/login");
};

exports.adminOnly = (req, res, next) => {
  if (res.locals.isAdmin) {
    return next();
  }
  req.session.returnTo = req.originalUrl;
  res.redirect("/");
}