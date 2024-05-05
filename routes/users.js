const express = require('express');
const router = express.Router();
const path = require('path');
const userController = require(path.join('..', 'controllers', 'usersController'));

const multer = require('multer');
const upload = multer({ dest: path.join('uploads', 'avatars')})


router
    .route('/')
    .get(userController.getAllUsers)
    .post(upload.single('avatar'), userController.createUser);

router
    .route('/:username')
    .get(userController.getUser)
    .delete(userController.deleteUser)




module.exports = router;