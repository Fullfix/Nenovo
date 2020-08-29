const mongoose = require('mongoose');
const updateNews = require('./updateNews');
require('dotenv/config');

mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Connected to MongoDB successfully');
            updateNews();
        }
    }
)