const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { verifyPassword } = require('../services/authUtils')

// authentication
router.post('/authenticate', async (req, res, next) => {
    console.log(req.body)
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({
            ok: false,
            error: {
                reason: "Missing parameters",
                code: 400
            }
        })
    }
    let user = await User.findOne({email: req.body.email})
    if (!user) {
        return res.status(400).send({
            ok: false,
            error: {
                reason: "User with this email does not exist",
                code: 400
            }
        })
    }
    let validPassword = await user.validPassword(req.body.password)
    if (!validPassword) {
        return res.status(400).send({
            ok: false,
            error: {
                reason: "Invalid password",
                code: 400
            }
        })
    }
    req.session.userData = {
        id: user._id,
        email: user.email
    }
    res.data = {
        ok: true
    }
    next()
})

router.post('/register', async (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({
            ok: false,
            error: {
                reason: "Missing parameters",
                code: 400
            }
        })
    }
    if (!verifyPassword(req.body.password)) {
        return res.status(400).send({
            ok: false,
            error: {
                reason: "Invalid passwrd. Must contain 6-20 numbers, 1 numeric and 1 uppercase digit",
                code: 400
            }
        })
    }
    let keyWords = req.body.keywords || []
    let saveUser
    try {
        let user = new User({
            email: req.body.email,
            data: {
                keyWords: keyWords,
                watchedArticles: [],
            }
        })
        await user.setPassword(req.body.password)
        saveUser = await user.save()
    }
    catch (e) {
        if (e) {
            return res.status(400).send({
                ok: false,
                error: {
                    reason: e.message || e.errmsg,
                    code: 400
                }
            })
        }
    }
    res.data = {
        user: saveUser
    }
    next()
})

router.put('/changekeywords', async (req, res, next) => {
    if (!req.body.keywords) {
        return res.status(400).send({
            ok: false,
            error: {
                reason: 'Missing keywods',
                code: 400
            }
        })
    }
    try {
        let user = await User.findById(req.session.userData.id)
        await user.set({data: {keyWords: req.body.keywords}})
        await user.save()
    }
    catch (e) {
        return res.status(400).send({
            ok: false,
            error: {
                reason: e.message || e.errmsg,
                code: 400
            }
        })
    }
    res.data = {
        keywords: req.body.keywords
    }
    next()
})

module.exports = router