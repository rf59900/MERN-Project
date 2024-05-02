const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config()

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/testdb');

app.use(express.urlencoded({ extended: true} ));
app.use(express.json());

const userRouter = require(path.join(__dirname, 'routes', 'users.js'));
app.use('/users', userRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
})

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}.....`));