require('dotenv').config();
const path = require('path');
const mongoose = require('mongoose');
const User = require(path.join('..', 'models', 'User'));
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (!await User.exists({ username: req.body.username })) {
        res.status(400).json({"Error": "Username does not exist"})
        return
    }
    
    const user = await User.findOne({username: username});
    const match = await bcrypt.compare(password, user.password);
    
    if (match) {
        
    }

}

module.exports = {
    handleLogin
}