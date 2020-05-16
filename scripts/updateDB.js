const Category = require('../models/Category')
const Article = require('../models/Article')


const addArticlesToCategory = async (category, articles) => {
    let categoryObj = await Category.findOne({name: category})
    console.log(categoryObj)
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
            await articleObj.save()
            categoryObj.articles.push(articleObj._id)
        }
    }
    await categoryObj.save()
}

const updateDB = async (categoryArticles) => {
    for (let cat of Object.keys(categoryArticles)) {
        await addArticlesToCategory(cat, categoryArticles[cat])
    }
    console.log('updated')
    console.log(Category.find({}))
}

module.exports = updateDB