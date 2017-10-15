import { combineReducers } from 'redux'
import {
  UPDATE_CATEGORIES,
  GET_CATEGORY_POSTS,
  GET_ALL_POSTS,
  GET_POST_DETAILS,
  GET_POST_COMMENTS
} from '../actions'

function categories (state = [], action) {
  return action.type === UPDATE_CATEGORIES ? action.payload : state
}

function getParentIdOfComments (comments) {
  return comments && comments[0] && comments[0].parentId
}

function addCommentsToPost (posts, comments) {
  return posts.map(post => {
    if (post.id === getParentIdOfComments(comments)) {
      post.comments = comments
    }
    return post
  })
}

function posts (state = [], action) {
  const payload = action.payload
  switch (action.type) {
    case GET_CATEGORY_POSTS:
      return payload
    case GET_ALL_POSTS:
      return payload
    case GET_POST_COMMENTS:
      return addCommentsToPost(state, payload)
    default:
      return state
  }
}

function postDetails (state = {}, action) {
  return action.type === GET_POST_DETAILS ? action.payload : state
}

function postComments (state = [], action) {
  return action.type === GET_POST_COMMENTS ? action.payload : state
}

export default combineReducers({
  categories,
  posts,
  postDetails,
  postComments
})
