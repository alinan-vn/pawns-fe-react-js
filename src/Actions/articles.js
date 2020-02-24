const saveArticles = articles => {
    return {
        type: 'SAVE_ARTICLES',
        articles
    }
}

const currentArticle = article => {
    return {
        type: 'CHANGE_ARTICLE',
        article
    }
}

const clearArticle = () => {
    return {
        type: 'CLEAR_ARTICLE'
    }
}


export {
    saveArticles,
    currentArticle,
    clearArticle
}