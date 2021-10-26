"use strict";

const express = require("express");
const router = express.Router();
const controller = require('../controllers/PostController');
const secured = require('./Secured');

router.get("/new", secured, controller.form);
router.post("/new", secured, controller.create);
router.get("/", secured, controller.list);

module.exports = router;