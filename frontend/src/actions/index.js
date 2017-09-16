import api from '../api'

export const UPDATE_CATEGORIES = 'UPDATE_CATEGORIES'

export const updateCategories = (categories) => ({
  type: UPDATE_CATEGORIES,
  categories
})

export const fetchCategories = () => (dispatch) => {
  api
    .getCategories()
    .then(categories => dispatch(updateCategories(categories)))
}
