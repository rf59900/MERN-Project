const express = require('express');
const router = express.Router();

router
    .route('/')
    .get((req, res) => {
        res.send("GET Users");
    })
    .post((req, res) => {
        res.send("POST Users");
    });

router
    .route('/:id')
    .get((req, res) => {
        res.send(`Get ID: ${req.params.id}`);
    })




module.exports = router;