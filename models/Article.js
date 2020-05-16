const mongoose = require('mongoose')


const ArticleSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    imageSrc: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    originSrc: {
        type: String,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model('Articles', ArticleSchema)