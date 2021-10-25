"use strict";

const express = require("express");
const router = express.Router();
const controller = require('../controllers/AuthController');
const passport = require("passport");

router.get(
  "/login",
  passport.authenticate("auth0", {scope: "openid email profile"}),
  controller.login);

router.get("/callback", controller.callback);
router.get("/logout", controller.logout);

module.exports = router;
