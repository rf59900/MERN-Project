require('dotenv').config();
const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization']
    if (!authHeader?.startsWith('Bearer ')) {
        res.status(401).json({"ERROR": "Unauthorized user"})
        return
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                res.status(403).json({"ERROR": "Invalid token"});
                return;
            }
            req.user = decoded.userInfo.username;
            req.roles = decoded.userInfo.roles;
            next();

        }
    );

}

module.exports = verifyJWT;

