import { combineReducers } from 'redux'
import authReducer from './authReducer'
import articleReducer from './articleReducer'
import profileReducer from './profileReducer'

export default combineReducers({
    authReducer,
    articleReducer,
    profileReducer
})
