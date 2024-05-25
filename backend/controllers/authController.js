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
    const roles = user.roles;
    if (match) {
        const accessToken = jwt.sign(
            { "userInfo": {
                "username": user.username,
                "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '5m'}
        )
        const refreshToken = jwt.sign(
            { "username": user.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d'}
        )

        await User.updateOne({username: username}, { $set: { refreshToken: refreshToken}});
        
        // add secure: true and sameSite: true when working with frontend in chrome
        res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        res.status(200).json({ roles, accessToken });

    } else {
        res.status(400).json({"ERROR": "User failed to log in"});
    }


}

module.exports = {
    handleLogin
}