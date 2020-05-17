const express = require('express')
const router = express.Router()
const ObjectId = require('mongoose').Types.ObjectId
const Category = require('../models/Category')
const User = require('../models/User')
const Article = require('../models/Article')

router.post('/watch', async (req, res, next) => {
    if (!req.body.id) {
        return res.status(400).send({
            ok: false,
            message: {
                reason: 'missing article id',
                code: 400
            }
        })
    }
    if (!req.body.id instanceof String) {
        return res.status(400).send({
            ok: false,
            message: {
                reason: 'article id is not string',
                code: 400
            }
        })
    }
    let id = new ObjectId(req.body.id)
    let articleObj = await Article.findById(id).exec()
    if (!articleObj) {
        return res.status(400).send({
            ok: false,
            message: {
                reason: 'article with this id does not exist',
                code: 400
            }
        })
    }
    let user = await User.findById(req.session.userData.id)
    if (!user.data.watchedArticles.includes(id)) {
        user.data.watchedArticles.push(id)
        await user.save()
    }
    res.data = {
        watched: true
    }
    next()
})

router.get('/recent', async (req, res, next) => {
    let date = new Date()
    date.setDate(date.getDate() - 1)
    let articles = await Article.find({
        date: { $gte: date }
    }).sort('-date').exec()
    res.data = {
        articles: articles
    }
    next()
})

router.get('/recommended', async (req, res, next) => {
    let user = await User.findById(req.session.userData.id).exec()
    let date = new Date()
    date.setDate(date.getDay() - 3)
    console.log(user)
    let keywordSearch = user.data.keyWords.map(keyword => {
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
    console.log(keywordSearch)
    let articles;
    if (keywordSearch.length !== 0) {
        articles = await Article.find({
            $or: keywordSearch,
            date: { $gte: date }
        }).sort('-date').exec()
    }
    else {
        articles = await Article.find({
            date: { $gte: date }
        }).sort('-date').exec()
    }
    res.data = {
        keywords: user.data.keyWords,
        articles: articles
    }
    next()
})

module.exports = router