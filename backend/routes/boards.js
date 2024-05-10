const express = require('express');
const router = express.Router();
const path = require('path');
const postsController = require(path.join('..', 'controllers', 'postsController'));

const verifyRoles = require(path.join('..', 'middleware', 'verifyRoles'));

router
    .route('/:board')
    .get(postsController.getPostsByBoard)

module.exports = router;