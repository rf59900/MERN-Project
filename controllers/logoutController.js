const path = require('path');
const mongoose = require('mongoose');
const User = require(path.join('..', 'models', 'User'));

const handleLogout = async (req, res) => {
    // Delete access token on client
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        res.status(204).json({"SUCCESS": "No jwt"});
        return;
    }
    const refreshToken = cookies.jwt;

    if (!await User.exists({refreshToken: refreshToken})) {
        res.clearCookie('jwt', {httpOnly: true});
        res.status(204).json({"SUCCESS": "No content"});
        return;
    }

    const user = await User.updateOne({refreshToken: refreshToken}, {$set: {refreshToken: null}});

    res.clearCookie('jwt', {httpOnly: true});

    res.status(200).json({"SUCCESS": "User logged out"})
}
module.exports = {
    handleLogout
}
