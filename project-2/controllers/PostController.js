"use strict";

exports.form = (req, res) => {
    res.render("new_post", { title: "New post" });
}

exports.create = (req, res) => {
    console.log(req.body);
}
