import api from '../api'

export const UPDATE_CATEGORIES = 'UPDATE_CATEGORIES'
export const GET_CATEGORY_POSTS = 'GET_CATEGORY_POSTS'
export const GET_ALL_POSTS = 'GET_ALL_POSTS'
export const GET_POST_DETAILS = 'GET_POST_DETAILS'
export const GET_POST_COMMENTS = 'GET_POST_COMMENTS'
export const DELETE_POST = 'DELETE_POST'
export const EDIT_POST = 'EDIT_POST'
export const VOTE_POST_UP = 'VOTE_POST_UP'
export const VOTE_POST_DOWN = 'VOTE_POST_DOWN'
export const SORT_POSTS = 'SORT_POSTS'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const VOTE_COMMENT_UP = 'VOTE_COMMENT_UP'
export const VOTE_COMMENT_DOWN = 'VOTE_COMMENT_DOWN'

function callApiThenDispatchType (apiFunction, actionType) {
  return (...args) => (dispatch) => {
    apiFunction(...args)
      .then(data => dispatch({ type: actionType, payload: data }))
  }
}

export const fetchCategories = callApiThenDispatchType(api.getCategories, UPDATE_CATEGORIES)
export const fetchCategoryPosts = callApiThenDispatchType(api.getCategoryPosts, GET_CATEGORY_POSTS)
export const fetchAllPosts = callApiThenDispatchType(api.getAllPosts, GET_ALL_POSTS)
export const fetchPost = callApiThenDispatchType(api.getPostDetails, GET_POST_DETAILS)
export const fetchPostComments = callApiThenDispatchType(api.getPostComments, GET_POST_COMMENTS)
export const deletePost = callApiThenDispatchType(api.deletePost, DELETE_POST)
export const editPost = callApiThenDispatchType(api.editPost, EDIT_POST)
export const votePostUp = callApiThenDispatchType(api.votePostUp, VOTE_POST_UP)
export const votePostDown = callApiThenDispatchType(api.votePostDown, VOTE_POST_DOWN)
export const sortPosts = (sortBy) => (dispatch) => dispatch({type: SORT_POSTS, payload: sortBy})
export const deleteComment = callApiThenDispatchType(api.deleteComment, DELETE_COMMENT)
export const editComment = callApiThenDispatchType(api.editComment, EDIT_COMMENT)
export const voteCommentUp = callApiThenDispatchType(api.voteCommentUp, VOTE_COMMENT_UP)
export const voteCommentDown = callApiThenDispatchType(api.voteCommentDown, VOTE_COMMENT_DOWN)
