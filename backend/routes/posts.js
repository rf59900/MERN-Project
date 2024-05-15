const express = require('express');
const router = express.Router();
const path = require('path');
const postsController = require(path.join('..', 'controllers', 'postsController'));

const verifyRoles = require(path.join('..', 'middleware', 'verifyRoles'));

const multer = require('multer');
const upload = multer({ dest: path.join('..', 'frontend', 'public', 'uploads', 'posts')})


router
    .route('/')
    .get(postsController.getAllPosts)
    .post(upload.single('img'), postsController.createPost)

router
    // identifier is used as username in getPostsByUser and as the post id in deletePost
    .route('/:identifier')
    .get(postsController.getPostsByUser)
    .delete(postsController.deletePost)

router.
    route('/view/:id')
    .get(postsController.getPostByID);

module.exports = router;