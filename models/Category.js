const mongoose = require('mongoose')


const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    articles: {
        type: [mongoose.Schema.Types.ObjectId]
    }
})

module.exports = mongoose.model('Categories', CategorySchema)