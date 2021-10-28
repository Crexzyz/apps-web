"use strict";

const express = require('express');
const router = express.Router();
const controller = require('../controllers/CommentController');
const Customs = require('./Customs');

router.post('/:id', Customs.loggedInOnly, controller.create);

module.exports = router;
