const jwt = require('jsonwebtoken');
const { verifyToken } = require('../services/authUtils');
require('dotenv/config')

const secret = process.env.SECRET_KEY

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.status(401).send({
        ok: false,
        error: {
            reason: 'Auth token missing or invalid',
            code: 401,
        }
    });
    const user = verifyToken(token);
    if (!user) {
        return res.status(401).send({
            ok: false,
            error: {
                reason: 'Auth token missing or invalid',
                code: 401,
            }
        });
    }
    req.user = user;
    return next();
}