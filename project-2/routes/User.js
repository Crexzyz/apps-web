"use strict";

const express = require("express");
const router = express.Router();
const controller = require('../controllers/UserController');
const secured = require('./Secured');

router.get("/", secured, controller.user);

module.exports = router;
