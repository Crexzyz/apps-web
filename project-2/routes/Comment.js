"use strict";

const express = require('express');
const router = express.Router();
const controller = require('../controllers/CommentController');
const secured = require('./Secured');

router.post('/:id', secured, controller.create);

module.exports = router;
