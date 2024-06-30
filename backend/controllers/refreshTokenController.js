require('dotenv').config();
const path = require('path');
const mongoose = require('mongoose');
const User = require(path.join('..', 'models', 'User'));
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        res.status(401).json({"Error": "No jwt"})
        return
    }
    console.log(cookies.jwt);
    const refreshToken = cookies.jwt;

    if (!await User.exists({refreshToken: refreshToken})) {
        res.status(403).json({"Error": "No jwt 2"})
        return;
    }

    const user = await User.findOne({refreshToken: refreshToken});
    const roles = user.roles;
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || user.username != decoded.username) {
                res.status(403).json({"ERROR": "Unauthorized"})
                return;
            }
            const accessToken = jwt.sign(
                {"userInfo": {
                    "username": decoded.username,
                    "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '5m'}
            )
            res.status(200).json({ accessToken })

        }
    )

}
module.exports = {
    handleRefreshToken
}