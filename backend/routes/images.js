const express = require('express');
const router = express.Router();
const path = require('path');
const imagesController = require(path.join('..', 'controllers', 'imagesController'));

router
    .route('/:imageName')
    .get(imagesController.getImageURL);

module.exports = router;

