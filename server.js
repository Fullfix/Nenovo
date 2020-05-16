const express = require('express')
const mongoose = require('mongoose')
const User = require('./models/User')
const bodyParser = require('body-parser')
const cors = require("cors");
const {isNewSessionRequired, isAuthRequired, verifyToken} = require('./services/authUtils')
const user = require('./routes/user')
const category = require('./routes/category')

const updateNews = require('./scripts/updateNews')
const getArticles = require('./scripts/getArticles')

// updateNews()
// const shit = async () => {
//     art = await getArticles()
//     console.log(art.internet)
// }
// shit()

require('dotenv/config')
require('./models/Article')
require('./models/Category')

const app = express()
const port = 3001

const whiteList = ['http://localhost:3000', 'http://localhost:3001']
const corsOptions = {
    origin: (origin, callback) => {
        if (whiteList.indexOf(origin) !== -1) {
            callback(null, true)
        }
        else {
            console.log("CORS")
            callback(new Error('YOU SHALL NOT PASS'))
        }
    }
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


// Validate JWT token if needed
app.use(async (req, res, next) => {
    let apiUrl = req.originalUrl
    let httpMethod = req.method
    req.session = {}

    if (isNewSessionRequired(httpMethod, apiUrl)) {
        req.newSessionRequired = true
    }
    else if (isAuthRequired(httpMethod, apiUrl)) {
        let authHeader = req.header('Authorization')
        let sessionID = authHeader.split(' ')[1];
        if (sessionID) {
            userData = verifyToken(sessionID)
            if (userData) {
                req.session.userData = userData
                req.session.sessionID = sessionID
            }
            else {
                return res.status(401).send({
                    ok: false,
                    error: {
                        reason: "Invalid SessionToken",
                        code: 401
                    }
                })
            }
        }
        else {
            return res.status(401).send({
                ok: false,
                error: {
                    reason: "Missing SessionToken",
                    code: 401
                }
            })
        }
    }
    next()
})

app.get('/', (req, res) => res.send('Hello World!'))
app.use('/api/user', user)
app.use('/api/category', category)

// Handle response, add token if needed
app.use(async (req, res, next) => {
    if (!res.data) {
        return res.status(404).send({
            status: false,
            error: {
                reason: "Invalid Endpoint",
                code: 404
            }
        })
    }
    if (req.newSessionRequired && req.session.userData) {
        let user = await User.findById(req.session.userData.id)
        try {
            let jwt = await user.generateJWT()
            res.setHeader('session-token', jwt)
            res.data['session-token'] = jwt
        }
        catch (e) {
            console.log(`e: ${e}`)
        }
    }
    if (req.session && req.session.sessionID) {
        try {
            res.setHeader('session-token', req.session.sessionID)
            res.data['session-token'] = req.session.sessionID
        }
        catch (e) {
            console.log(`e: ${e}`)
        }
    }
    res.status(res.statusCode || 200)
    .send({status: true, response: res.data})
})

app.listen(port, () => console.log(`Example app listening on port port!`))
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => console.log('connected to DB!!!')
)