const express = require('express');
const router = express.Router();
const path = require('path');
const userController = require(path.join('..', 'controllers', 'usersController'));

router
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser);

router
    .route('/:id')
    .get(userController.getUser)




module.exports = router;