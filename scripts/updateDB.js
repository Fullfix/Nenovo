const Category = require('../models/Category')
const Article = require('../models/Article')


const addArticlesToCategory = async (category, articles) => {
    let counter = 0;
    let categoryObj = await Category.findOne({name: category})
    if (!categoryObj) {
        categoryObj = new Category({
            name: category,
            articles: []
        })
    }
    let articleObj;

    articles = articles.filter(art => art.description && art.urlToImage && art.url)

    for (let article of articles) {
        if (!await Article.findOne({title: article.title})) {
            articleObj = new Article({
                title: article.title,
                date: article.publishedAt,
                imageSrc: article.urlToImage,
                text: article.description,
                originSrc: article.url
            })
            await articleObj.save();
            categoryObj.articles.push(articleObj._id);
            counter++;
        }
    }
    await categoryObj.save()
    return counter;
}

const updateDB = async (categoryArticles) => {
    console.log('Started Updating');
    const numObject = {};
    for (let cat of Object.keys(categoryArticles)) {
        const counter = await addArticlesToCategory(cat, categoryArticles[cat]);
        numObject[cat] = counter;
    }
    console.log('Finished Updating');
    console.log('UPDATED:');
    const total = [].concat(...Object.values(numObject)).reduce((a, b) => a + b, 0);
    Object.entries(numObject).map(([key, value]) => {
        console.log(`${key}: ${value}`);
    });
    console.log(`Updated in total: ${total} articles`);

}

module.exports = updateDB