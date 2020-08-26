const express = require('express')
const router = express.Router()
const ObjectId = require('mongoose').Types.ObjectId
const Category = require('../models/Category')
const Article = require('../models/Article')
const { translateCategories } = require('../data')

router.get('/names', async (req, res, next) => {
    const names = await Category.find({}, {name: 1}).exec();
    names = names.map(cat => [cat.name, translateCategories[cat.name]]);
    console.log(names);
    res.data = names;
    return next();
})

router.get('/articles', async (req, res, next) => {
    const categoryName = req.body.name;
    if (!categoryName) {
        res.data = { err: 'Missing parameter: name' };
        return next();
    }
    const category = await Category.findOne({name: categoryName}).exec();
    if (!category) {
        res.data = { err: 'Category with this name does not exist' };
        return next();
    }
    const date = new Date();
    date.setDate(date.getDay() - 3);
    const articles = await Article.find({
        '_id': { $in: category.articles},
        'date': { $gte: date }
    }).sort('-date').exec();
    const articlesObj = articles.map(article => article.toObject());
    res.data = articlesObj;
    next();
})

module.exports = router;