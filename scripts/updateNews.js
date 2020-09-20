const getArticles = require('./getArticles');
const updateDB = require('./updateDB');

const printArticles = (categoryArticles) => {
    const total = [].concat(...Object.values(categoryArticles)).length;
    console.log('FETCHED:');
    Object.entries(categoryArticles).map(([key, value]) => {
        console.log(`${key}: ${value.length}`);
    });
    console.log(`Fetched in total: ${total} articles`);
}

const updateNews = async () => {
    console.log('Started Fetching');
    let categoryArticles = await getArticles();
    console.log('Finished Fetching');
    printArticles(categoryArticles);
    await updateDB(categoryArticles);
}

module.exports = updateNews;