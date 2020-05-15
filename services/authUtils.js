const User = require('../models/User')
const jwt = require('jsonwebtoken')
require('dotenv/config')
const secret = process.env.SECRET_KEY
const newSessionRoutes = [
    {path: '/api/user/authenticate', method: 'POST'},
]
const authRoutes = [
    {path: '/api/article/recommended', method: 'GET'},
    {path: '/api/article/watch', method: 'POST'},
    {path: '/api/user/changekeywords', method: 'PUT'}
]
// let exports = module.exports = {}

exports.isNewSessionRequired = (httpMethod, url) => {
    for (let routeObj of newSessionRoutes) {
        if (httpMethod === routeObj.method && url === routeObj.path) {
            return true
        }
    }
    return false
}

exports.isAuthRequired = (httpMethod, url) => {
    for (let routeObj of authRoutes) {
        if (httpMethod === routeObj.method && url === routeObj.path) {
            return true
        }
    }
    return false
}

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
    return password.match(passw)
}