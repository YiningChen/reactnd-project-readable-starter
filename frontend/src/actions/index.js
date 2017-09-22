import api from '../api'

export const UPDATE_CATEGORIES = 'UPDATE_CATEGORIES'
export const UPDATE_CATEGORY_POSTS = 'UPDATE_CATEGORY_POSTS'

export const updateCategories = (categories) => ({
  type: UPDATE_CATEGORIES,
  categories
})

export const updateCategoryPosts = (posts) => ({
  type: UPDATE_CATEGORY_POSTS,
  posts
})

function callApiThenAction (apiFunction, action) {
  return (argument) => (dispatch) => {
    apiFunction(argument)
      .then(data => dispatch(action(data)))
  }
}

export const fetchCategories = callApiThenAction(api.getCategories, updateCategories)
export const fetchCategoryPosts = callApiThenAction(api.getCategoryPosts, updateCategoryPosts)
