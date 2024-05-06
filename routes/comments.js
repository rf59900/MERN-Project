const express = require('express');
const router = express.Router();
const path = require('path');
const commentsController = require(path.join('..', 'controllers', 'commentsController'));

const verifyRoles = require(path.join('..', 'middleware', 'verifyRoles'));

const multer = require('multer');
const upload = multer({ dest: path.join('uploads', 'comments')})


router
    .route('/')
    .get(commentsController.getAllComments)
    .post(upload.single('img'), commentsController.createComment);

router
    .route('/:identifier')
    .get(commentsController.getCommentsByPost)
    .delete(commentsController.deleteComment);

router
    .route('/user/:username')
    .get(commentsController.getAllCommentsByUser)

module.exports = router;