'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/PostController');
const Customs = require('./Customs');
const path = require('path');

const multer = require('multer');

// Multer config
const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, path.join(__dirname, '../public/images'));
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  },
  fileFilter: function (req, file, callback) {
        if (!file.originalname.match(/\.(png|jpg)$/)) { 
        // upload only png and jpg format
        return callback(new Error('Please upload a Image'))
      }
      callback(undefined, true)
  }
});

const upload = multer({storage});

router.get('/new', Customs.loggedInOnly, controller.form);
router.post('/new', Customs.loggedInOnly, upload.single('image'), controller.create);
router.get('/', Customs.loggedInOnly, controller.list);
router.get('/:id', Customs.loggedInOnly, controller.details);
router.get('/category/:name', Customs.loggedInOnly, controller.listCategory);
router.get('/user/:id', Customs.loggedInOnly, controller.listUser);

module.exports = router;
