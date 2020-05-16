const { initialKeywords } = require('../data')

const getKeywords = () => {
    return initialKeywords
}

const getKeywordsString = () => {
    let keywords = getKeywords()
    Object.keys(keywords).forEach(cat => {
        keywords[cat] = keywords[cat].join(' OR ')
    })
    return keywords
}

module.exports = getKeywordsString