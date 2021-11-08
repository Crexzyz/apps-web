"use strict";

const Comment = require('../models/index.js').Comment;
const getAuthLevel = require("./PostsHelper").getAuthLevel;

const MAX_TEXT_LENGTH = 200;

exports.create = async (req, res) => {
    const postId = req.params.id;
    const email = req.body.email; // TODO: Validate if it can be any mail
    const text = req.body.text.substring(0, MAX_TEXT_LENGTH);

    const comment = await Comment.create({
        email: email,
        text: text,
        PostId: postId
    });

    res.redirect('/posts/' + postId);
}

exports.delete = async (req, res) => {
    const commentId = req.params.id;
    const postId = req.body.postId;

    await Comment.destroy({
        where: {
            id: commentId
        }
    });

    res.redirect('/posts/' + postId);
}