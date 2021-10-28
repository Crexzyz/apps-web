"use strict";

const express = require("express");
const router = express.Router();
const controller = require('../controllers/UserController');
const Customs = require('./Customs');

router.get("/", Customs.loggedInOnly, controller.user);

module.exports = router;
