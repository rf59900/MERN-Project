const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config()
const cors = require('cors');
const cookieParser = require('cookie-parser');

const mongoose = require('mongoose');
const conn = mongoose.connect('mongodb://127.0.0.1:27017/testdb');
conn.catch(err => console.log(err))

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(express.urlencoded({ extended: true} ));
app.use(express.json());

app.use(cookieParser());

const usersRouter = require(path.join(__dirname, 'routes', 'users.js'));
const authRouter = require(path.join(__dirname, 'routes', 'auth.js'));
const postsRouter = require(path.join(__dirname, 'routes', 'posts.js'));
const commentsRouter = require(path.join(__dirname, 'routes', 'comments.js'));
const boardsRouter = require(path.join(__dirname, 'routes', 'boards.js'));
const imagesRouter = require(path.join(__dirname, 'routes', 'images.js'));

const verifyJWT = require(path.join(__dirname, 'middleware', 'verifyJWT.js'));
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/images', imagesRouter);

app.use(verifyJWT);
app.use('/posts',postsRouter);
app.use('/comments', commentsRouter);
app.use('/boards', boardsRouter);



app.get('/', (req, res) => {
    res.send('Hello World!');
})

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}.....`));