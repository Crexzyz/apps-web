"use strict";

const express = require('express');
const router = express.Router();
const controller = require('../controllers/CommentController');
const Customs = require('./Customs');

router.post('/:id', controller.create);
router.post('/delete/:id', Customs.loggedInOnly, Customs.authorizePostAction, controller.delete);

module.exports = router;
