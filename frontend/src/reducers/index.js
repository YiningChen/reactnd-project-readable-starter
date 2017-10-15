import { combineReducers } from 'redux'
import {
  UPDATE_CATEGORIES,
  GET_CATEGORY_POSTS,
  GET_ALL_POSTS,
  GET_POST_DETAILS,
  GET_POST_COMMENTS,
  DELETE_POST,
  EDIT_POST,
  VOTE_POST_UP,
  VOTE_POST_DOWN
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

function updateObjectInArray (objects, payload, fields) {
  return objects.map(object => {
    if (object.id === payload.id) {
      fields.forEach(field => {
        object[field] = payload[field]
      })
    }
    return object
  })
}

function deleteObjectInArray (objects, id) {
  return objects.filter(object => {
    return object.id !== id
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
    case DELETE_POST:
      return deleteObjectInArray(state, payload.id)
    case EDIT_POST:
      return updateObjectInArray(state, payload, ['title', 'body'])
    case VOTE_POST_UP:
    case VOTE_POST_DOWN:
      return updateObjectInArray(state, payload, ['voteScore'])
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
