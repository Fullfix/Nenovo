const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { verifyPassword } = require('../services/authUtils');
const auth = require('../middleware/auth');

router.get('/all', async (req, res, next) => {
    try {
        res.data = await User.find({}).exec();
        return next();
    } catch (e) {
        res.data = { err: e.message || e.errmsg };
        return next();
    }
});

// authentication
router.post('/signin', async (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        res.data = { err: 'Missing parameters' };
        return next();
    }
    const user = await User.findOne({email: req.body.email});
    if (!user) {
        res.data = { err: 'User with this email does not exist' };
        return next();
    }
    const validPassword = await user.validPassword(req.body.password);
    if (!validPassword) {
        res.data = { err: 'Invalid password' };
        return next();
    }
    res.data = user.generateJWT();
    next();
})

router.post('/signup', async (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        res.data = { err: 'Missing parameters' };
        return next();
    }
    if (!verifyPassword(req.body.password)) {
        res.data = {
            err: "Invalid password. Must contain 6-20 numbers, 1 numeric and 1 uppercase digit"
        }
        return next();
    }
    try {
        const user = new User({
            email: req.body.email,
            data: {
                keyWords: req.body.keywords || [],
                watchedArticles: [],
            }
        })
        await user.setPassword(req.body.password);
        const newUser = await user.save();
        res.data = newUser;
        return next();
    }
    catch (e) {
        res.data = { err: e.message || e.errmsg };
        return next();
    }
})

router.put('/changekeywords', async (req, res, next) => {
    if (!req.body.keywords) {
        res.data = { err: 'Missing keywords' };
        return next();
    }
    try {
        const user = await User.findById(req.user.id);
        const newUser = user.set({data: {keyWords: req.body.keywords}});
        await newUser.save();
        res.data = req.body.keywords;
        next();
    }
    catch (e) {
        res.data = { err: e.message || e.errmsg };
        return next();
    }
});



module.exports = router;