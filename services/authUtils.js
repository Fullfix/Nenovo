const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv/config');

const secret = process.env.SECRET_KEY;

exports.verifyToken = (jwtToken) => {
    try {
        return jwt.verify(jwtToken, secret)
    }
    catch(e) {
        console.log(`e: ${e}`)
        return null
    }
}

exports.verifyPassword = (password) => {
    let passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/
    return password.match(passw);
}