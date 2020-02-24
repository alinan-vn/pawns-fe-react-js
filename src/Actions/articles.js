const saveArticles = articles => {
    return {
        type: 'SAVE_ARTICLES',
        articles
    }
}



export {
    saveArticles
}