function blogReducer(
    state = {
        blogs: []
    },
    action
){
    switch(action.type){
        case 'SAVE_BLOGS':
            return {
                ...state,
                blogs: action.blogs
            }
        default:
            return state
    }
}

export default blogReducer
