function profileReducer (
    state = {
        currentProfile: null
    },
    action
){
    switch(action.type){
        case 'CURRENT_PROFILE':
            return {
                ...state,
                user: action.user
            }
        default:
            return state
    }
}

export default profileReducer
