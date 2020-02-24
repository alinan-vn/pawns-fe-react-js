import { combineReducers } from 'redux'
import authReducer from './authReducer'
import articleReducer from './articleReducer'

export default combineReducers({
    authReducer,
    articleReducer
})
