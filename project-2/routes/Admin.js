"use strict";

const express = require("express");
const router = express.Router();
const controller = require('../controllers/AdminController');
const Customs = require('./Customs')

router.get("/users", Customs.loggedInOnly, Customs.adminOnly, controller.users);
router.post("/users/update", Customs.loggedInOnly, Customs.adminOnly, controller.updateUser);
router.post("/users/delete", Customs.loggedInOnly, Customs.adminOnly, controller.deleteUser);

router.get("/categories", Customs.loggedInOnly, Customs.adminOnly, controller.categories);
router.post("/categories/delete", Customs.loggedInOnly, Customs.adminOnly, controller.deleteCategory);
router.post("/categories/create", Customs.loggedInOnly, Customs.adminOnly, controller.createCategory);

router.get("/posts", Customs.loggedInOnly, Customs.adminOnly, controller.posts);
router.post("/posts/delete", Customs.loggedInOnly, Customs.adminOnly, controller.deletePost);

module.exports = router;
