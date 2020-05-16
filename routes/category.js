const express = require('express')
const router = express.Router()
const ObjectId = require('mongoose').Types.ObjectId
const Category = require('../models/Category')
const Article = require('../models/Article')
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

router.get('/articles', async (req, res, next) => {
    let categoryName = req.body.name
    if (!categoryName) {
        return res.status(400).send({
            ok: false,
            error: {
                reason: 'Missing parameter: name',
                code: 400
            }
        })
    }
    let category = await Category.findOne({name: categoryName}).exec()
    if (!category) {
        return res.status(400).send({
            ok: false,
            error: {
                reason: 'Category with this name does not exist',
                code: 400
            }
        })
    }
    let date = new Date()
    date.setDate(date.getDay() - 3)
    let articles = await Article.find({
        '_id': { $in: category.articles},
        'date': { $gte: date }
    }).sort('-date').exec()
    let articlesObj = articles.map(article => article.toObject())
    res.data = {
        articles: articlesObj
    }
    next()
})

module.exports = router