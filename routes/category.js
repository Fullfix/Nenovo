const express = require('express')
const router = express.Router()
const Category = require('../models/Category')
const { translateCategories } = require('../data')

router.get('/names', async (req, res, next) => {
    let names = await Category.find({}, {name: 1}).exec()
    names = names.map(cat => [cat.name, translateCategories[cat.name]])
    console.log(names)
    res.data = {
        names: names
    }
    next()
})

module.exports = router