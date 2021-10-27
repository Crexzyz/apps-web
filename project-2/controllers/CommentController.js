"use strict";

const Post = require('../models/index.js').Post;
const Comment = require('../models/index.js').Comment;

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
