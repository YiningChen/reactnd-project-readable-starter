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
  VOTE_POST_DOWN,
  SORT_POSTS,
  DELETE_COMMENT,
  EDIT_COMMENT,
  VOTE_COMMENT_UP,
  VOTE_COMMENT_DOWN
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

function posts (state = [{}], action) {
  const payload = action.payload
  switch (action.type) {
    case GET_CATEGORY_POSTS:
      return payload
    case GET_ALL_POSTS:
      return payload
    case GET_POST_DETAILS:
      return [payload]
    case GET_POST_COMMENTS:
      return addCommentsToPost(state, payload)
    case DELETE_POST:
      return deleteObjectInArray(state, payload.id)
    case EDIT_POST:
      return updateObjectInArray(state, payload, ['title', 'body'])
    case VOTE_POST_UP:
    case VOTE_POST_DOWN:
      return updateObjectInArray(state, payload, ['voteScore'])
    case SORT_POSTS:
      return state.slice().sort((current, next) => next[payload] - current[payload])
    default:
      return state
  }
}

function comments (state = [], action) {
  const payload = action.payload
  switch (action.type) {
    case GET_POST_COMMENTS:
      return payload
    case DELETE_COMMENT:
      return deleteObjectInArray(state, payload.id)
    case EDIT_COMMENT:
      return updateObjectInArray(state, payload, ['body', 'timestamp'])
    case VOTE_COMMENT_UP:
    case VOTE_COMMENT_DOWN:
      return updateObjectInArray(state, payload, ['voteScore'])
    default:
      return state
  }
}

export default combineReducers({
  categories,
  posts,
  comments
})
