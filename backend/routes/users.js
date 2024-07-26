const express = require('express');
const router = express.Router();
const path = require('path');
const userController = require(path.join('..', 'controllers', 'usersController'));
const verifyRoles = require(path.join('..', 'middleware', 'verifyRoles'));

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage : storage });

router
    .route('/')
    .get(userController.getAllUsers)
    .post(upload.single('avatar'), userController.createUser)

router
    .route('/:username')
    .get(userController.getUser)
    .delete(userController.deleteUser)

router
    .route('/update-avatar')
    .patch(upload.single('avatar'), userController.updateAvatar)



module.exports = router;