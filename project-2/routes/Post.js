'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/PostController');
const Customs = require('./Customs');

router.get('/new', Customs.loggedInOnly, controller.form);
router.post('/new', Customs.loggedInOnly, controller.create);
router.get('/', Customs.loggedInOnly, controller.list);
router.get('/:id', Customs.loggedInOnly, controller.details);
router.get('/category/:name', Customs.loggedInOnly, controller.listCategory);
router.get('/user/:id', Customs.loggedInOnly, controller.listUser);

module.exports = router;
