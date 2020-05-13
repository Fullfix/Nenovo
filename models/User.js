const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
require('dotenv/config')
const secret = process.env.SECRET_KEY


const UserSchema = mongoose.Schema({
    username: {
        type: String,
        lowercase: true,
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
        index: true,
        required: true,
        unique: true
    },
    hash: {
        type: String
    },
    salt: {
        type: String
    },
    data: {
        keyWords: {
            type: [String],
            required: false
        },
        watchedArticles: {
            type: [mongoose.Schema.Types.ObjectId],
            required: false
        }
    }
})

UserSchema.plugin(uniqueValidator, {message: 'is already taken'})

UserSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex')
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
}

UserSchema.methods.validPassword = function(password) {
    let hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
    return this.hash === hash
}

UserSchema.methods.generateJWT = function() {
    let today = new Date()
    let exp = new Date(today)
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
        id: this._id,
        username: this.username,
        exp: parseInt(exp.getTime() / 1000)
    }, secret)
}

UserSchema.methods.toAuthJSON = function() {
    return {
        username: this.username,
        token: this.generateJWT()
    }
}

module.exports = mongoose.model('Users', UserSchema)