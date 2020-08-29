const getArticles = require('./getArticles');
const updateDB = require('./updateDB');

const updateNews = async () => {
    let categoryArticles = await getArticles();
    console.log(`Fetched articles`);
    await updateDB(categoryArticles);
}

module.exports = updateNews;