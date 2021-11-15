"use strict";

const PostsHelper = require('../controllers/PostsHelper');

exports.loggedInOnly = (req, res, next) => {
  if (req.user) {
    return next();
  }
  req.session.returnTo = req.originalUrl;
  res.redirect("/login");
};

exports.authorizePostAction = async (req, res, next) => {
  let authorized = true;

  // Default to POST parameter, GET if not found
  let postId = req.body.postId;
  if(postId === undefined || postId === null) {
    postId = req.params.id;
  }

  const ids = {
    id: postId,
    UserId: req.user.id
  }

  const authLevel = await PostsHelper.getAuthLevel(ids, req.user.id);

  if (authLevel === 'guest') {
    authorized = false;
  }

  if(authorized){
    return next();
  }
  
  req.session.returnTo = req.originalUrl;
  res.redirect("/");
}

exports.adminOnly = (req, res, next) => {
  if (res.locals.isAdmin) {
    return next();
  }
  req.session.returnTo = req.originalUrl;
  res.redirect("/");
}