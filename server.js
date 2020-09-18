const express = require('express')
const mongoose = require('mongoose')
const User = require('./models/User')
const bodyParser = require('body-parser')
const logger = require('morgan');
const cors = require("cors");
const path = require('path');
const {isNewSessionRequired, isAuthRequired, verifyToken} = require('./services/authUtils')
const user = require('./routes/user')
const category = require('./routes/category')
const article = require('./routes/article')

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
app.use(logger('dev'));
app.use('/public', express.static(__dirname + '/frontend/public'));
app.use(express.static(path.join(__dirname, 'frontend/build')));
// app.use(cors());

app.use('/api/user', user);
app.use('/api/category', category);
app.use('/api/article', article);

// Handle response, add token if needed
app.use('/api/*', async (req, res, next) => {
    if (!res.data) {
        return res.status(404).send({
            ok: false,
            error: {
                reason: "Invalid Endpoint",
                code: 404
            }
        })
    }
    if (res.data.err) {
        return res.status(res.data.status || 400).send({
            ok: false,
            error: {
                reason: res.data.err,
                code: res.data.status || 400,
            }
        })
    }
    return res.status(res.data.status || 200).send({
        ok: true, 
        response: res.data,
    })
})

app.get('*', (req, res) => { 
    res.sendfile(path.join(__dirname, 'frontend/build/index.html'));  
});

app.listen(port, () => console.log(`Backend listening on port ${port}`))
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Connected to MongoDB successfully');
        }
    }
)