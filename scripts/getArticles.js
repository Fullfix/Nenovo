const NewsAPI = require('newsapi')
const newsAPI = new NewsAPI('82e0a8c8fc0c49fbbdb89f33d8bdc835')
const getKeywordsString = require('../services/keywords')

Date.prototype.yyyymmdd = function() {
    let mm = this.getMonth() + 1
    let dd = this.getDate()

    return [this.getFullYear(),
        (mm > 9 ? '': 0) + mm,
        (dd > 9 ? '': 0) + dd
    ].join('-')
}

const getArticles = async () => {
    console.log('Started fetching');
    let date = new Date()
    let today = date.yyyymmdd()
    date.setDate(date.getDate() - 1)
    let yesterday = date.yyyymmdd()
    let keywords = getKeywordsString()
    let categoryArticles = {}
    for (let cat of Object.keys(keywords)) {
        let response = await newsAPI.v2.everything({
            q: keywords[cat],
            from: yesterday,
            to: today,
            language: 'ru',
            sortBy: 'relevancy',
        })
        if (response.status === 'ok') {
            categoryArticles[cat] = response.articles
        }
    }
    return categoryArticles
}

module.exports = getArticles