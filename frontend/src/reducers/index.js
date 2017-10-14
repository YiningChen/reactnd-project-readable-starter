import { combineReducers } from 'redux'
import {
  UPDATE_CATEGORIES,
  GET_CATEGORY_POSTS,
  GET_ALL_POSTS,
  GET_POST_DETIALS 
} from '../actions'

function categories (state = [], action) {
  return action.type === UPDATE_CATEGORIES ? action.payload : state
}

function posts (state = [], action) {
  switch (action.type) {
    case GET_CATEGORY_POSTS:
      return action.payload
    case GET_ALL_POSTS:
      return action.payload
    default:
      return state
  }
}

function postDetails(state = {}, action) {
  return action.type === GET_POST_DETIALS ? action.payload : state
}

export default combineReducers({
  categories,
  posts,
  postDetails
})
