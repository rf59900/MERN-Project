const path = require('path');
const mongoose = require('mongoose');
const User = require(path.join('..', 'models', 'User'));

const getAllUsers = (req, res) => {
    res.send("GET Users");
}

const createUser = (req, res) => {
    res.send("POST Users");
}

const getUser = (req, res) => {
    res.send(`Get ID: ${req.params.id}`);
}

module.exports = {
    getAllUsers,
    createUser,
    getUser
}
