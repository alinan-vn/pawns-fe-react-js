function profileReducer (
    state = {
        currentProfile: null
    },
    action
){
    switch(action.type){
        case 'CURRENT_PROFILE':
            // console.log('hit from comments', action.user)
            return {
                ...state,
                currentProfile: action.user
            }
        default:
            return state
    }
}

export default profileReducer
