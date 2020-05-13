const express = require('express')
const mongoose = require('mongoose')

require('dotenv/config')
require('./models/User')
require('./models/Article')
require('./models/Category')

const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port port!`))
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true },
    (err) => console.log('connected to DB!!!')
)