const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config()
const cors = require('cors');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/testdb');

app.use(cors({
    origin: "http://127.0.0.1:3000",
    credentials: true
}))

app.use(express.urlencoded({ extended: true} ));
app.use(express.json());

const userRouter = require(path.join(__dirname, 'routes', 'users.js'));
const authRouter = require(path.join(__dirname, 'routes', 'auth.js'));
app.use('/users', userRouter);
app.use('/auth', authRouter);


app.get('/', (req, res) => {
    res.send('Hello World!');
})

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}.....`));