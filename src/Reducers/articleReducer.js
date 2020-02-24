function articleReducer (
    state = {
        articles: []
    },
    action
){
    switch(action.type){
        case 'SAVE_ARTICLES':
            console.log('saving articles: ', action.articles)
            return {
                ...state,
                articles: action.articles
            }
        default:
            return state
    }
}

export default articleReducer
