const express = require('express');
const router = express.Router();
const path = require('path');
const authController = require(path.join('..', 'controllers', 'authController'));
const refreshTokenController = require(path.join('..', 'controllers', 'refreshTokenController'));
const logoutController = require(path.join('..', 'controllers', 'logoutController'));

router
    .route('/')
    .post(authController.handleLogin);

router
    .route('/refresh')
    .get(refreshTokenController.handleRefreshToken);

router
    .route('/logout')
    .get(logoutController.handleLogout);



module.exports = router;

