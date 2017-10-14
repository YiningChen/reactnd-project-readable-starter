import api from '../api'

export const UPDATE_CATEGORIES = 'UPDATE_CATEGORIES'
export const GET_CATEGORY_POSTS = 'GET_CATEGORY_POSTS'
export const GET_ALL_POSTS = 'GET_ALL_POSTS'
export const GET_POST_DETIALS = 'GET_POST_DETIALS'

function createActionWithType (actionType) {
  return (data) => ({
    type: actionType,
    payload: data
  })
}

function callApiThenDispatchType (apiFunction, actionType) {
  const action = createActionWithType(actionType)

  return (argument) => (dispatch) => {
    apiFunction(argument)
      .then(data => dispatch(action(data)))
  }
}

export const fetchCategories = callApiThenDispatchType(api.getCategories, UPDATE_CATEGORIES)
export const fetchCategoryPosts = callApiThenDispatchType(api.getCategoryPosts, GET_CATEGORY_POSTS)
export const fetchAllPosts = callApiThenDispatchType(api.getAllPosts, GET_ALL_POSTS)
export const fetchPostDetails = callApiThenDispatchType(api.getPostDetails, GET_POST_DETIALS)
