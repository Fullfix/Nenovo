const getArticles = require('./getArticles');
const updateDB = require('./updateDB');

const updateNews = async () => {
    let categoryArticles = await getArticles();
    await updateDB(categoryArticles);
}

module.exports = updateNews;