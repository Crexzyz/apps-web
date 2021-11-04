"use strict";

const express = require("express");
const router = express.Router();
const postController = require('../controllers/PostController');

router.get("/", postController.list);

module.exports = router;