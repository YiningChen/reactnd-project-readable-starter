import { combineReducers } from 'redux'
import {
  UPDATE_CATEGORIES,
  UPDATE_CATEGORY_POSTS
} from '../actions'

function categories (state = [], action) {
  return action.type === UPDATE_CATEGORIES ? action.categories : state
}

function posts (state = [], action) {
  return action.type === UPDATE_CATEGORY_POSTS ? action.posts : state
}

export default combineReducers({
  categories,
  posts
})
