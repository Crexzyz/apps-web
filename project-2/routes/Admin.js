"use strict";

const express = require("express");
const router = express.Router();
const controller = require('../controllers/AdminController');
const Customs = require('./Customs')

router.get("/users", Customs.loggedInOnly, Customs.adminOnly, controller.users);
router.post("/users/update", Customs.loggedInOnly, Customs.adminOnly, controller.updateUser);
router.post("/users/delete", Customs.loggedInOnly, Customs.adminOnly, controller.deleteUser);
// router.get("/categories", controller.categories);
// router.get("/posts", controller.posts);

module.exports = router;
