const express = require('express');
const router = express.Router();
const path = require('path');
const commentsController = require(path.join('..', 'controllers', 'commentsController'));

const verifyRoles = require(path.join('..', 'middleware', 'verifyRoles'));
const verifyJWT = require(path.join('..', 'middleware', 'verifyJWT.js'));

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage : storage });


router
    .route('/')
    .get(commentsController.getAllComments)
    .post(verifyJWT, upload.single('img'), commentsController.createComment);

router
    .route('/:identifier')
    .get(commentsController.getCommentsByPost)
    .delete(commentsController.deleteComment);

router
    .route('/user/:username')
    .get(commentsController.getAllCommentsByUser)

module.exports = router;