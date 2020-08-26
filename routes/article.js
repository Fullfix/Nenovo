const express = require('express')
const router = express.Router()
const ObjectId = require('mongoose').Types.ObjectId
const Category = require('../models/Category')
const User = require('../models/User')
const Article = require('../models/Article')
const auth = require('../middleware/auth')

router.post('/watch', auth, async (req, res, next) => {
    if (!req.body.id) {
        res.data = { err: 'Missing article id' };
        return next();
    }
    if (!req.body.id instanceof String) {
        res.data = { err: 'Article id is not string' };
        return next();
    }
    const id = new ObjectId(req.body.id);
    const articleObj = await Article.findById(id).exec();
    if (!articleObj) {
        res.data = { err: 'Article with this id does not exist' };
        return next();
    }
    const user = await User.findById(req.user.id);
    if (!user.data.watchedArticles.includes(id)) {
        user.data.watchedArticles.push(id)
        await user.save();
    }
    res.data = {
        watched: true,
    }
    return next();
})

router.get('/recent', async (req, res, next) => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    const articles = await Article.find({
        date: { $gte: date }
    }).sort('-date').exec();
    res.data = articles;
    return next();
})

router.get('/recommended', auth, async (req, res, next) => {
    const user = await User.findById(req.user.id).exec();
    const date = new Date();
    date.setDate(date.getDay() - 3);
    console.log(user);
    const keywordSearch = user.data.keyWords.map(keyword => {
        return {
            $or: [
                {
                    text: { $regex: keyword, $options: 'i'}
                },
                {
                    title: {$regex: keyword, $options: 'i'}
                }
            ]
        }
    })
    console.log(keywordSearch);
    let articles;
    if (keywordSearch.length !== 0) {
        articles = await Article.find({
            $or: keywordSearch,
            date: { $gte: date }
        }).sort('-date').exec();
    }
    else {
        articles = await Article.find({
            date: { $gte: date }
        }).sort('-date').exec();
    }
    res.data = {
        keywords: user.data.keyWords,
        articles: articles
    }
    return next();
})

module.exports = router;