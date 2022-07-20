import { combineReducers, applyMiddleware } from 'redux'
import user from './reducers/user'
import posts from './reducers/posts'
import message from './reducers/message'

export default combineReducers({
    user,
    posts,
    message
})
