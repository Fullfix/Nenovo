const initialKeywords = {
    politics: ['политика', 'Россия', 'Путин', 'США'],
    economy: ['экономика', 'бизнесс', 'деньги', 'финансы'],
    coronavirus: ['коронавирус', 'медицина', 'эпидемия', 'COVID-19', 'изоляция'],
    internet: ['интернет', 'технолигии', 'IT', 'программирование'],
    society: ['общество', 'публика', 'пресса', 'медиа'],
    entertainment: ['музыка', 'кино', 'развлечение', 'фанаты']
}

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