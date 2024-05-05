const express = require('express');
const router = express.Router();
const path = require('path');
const authController = require(path.join('..', 'controllers', 'authController'));

router
    .route('/')
    .post(authController.handleLogin);

module.exports = router;

