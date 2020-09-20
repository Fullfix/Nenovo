const mongoose = require('mongoose');
const updateNews = require('./updateNews');
require('dotenv/config');

mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    async (err) => {
        if (err) {
            console.log('Failed to connect to MongoDB');
            console.log(err);
        } else {
            console.log('Connected to MongoDB successfully');
            await updateNews();
            console.log('Closing connection');
            mongoose.connection.close();
        }
    }
)