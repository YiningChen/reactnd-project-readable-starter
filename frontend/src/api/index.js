/* globals fetch, localStorage */

// TODO: make dynamic
const api = 'http://localhost:3001'

const token = localStorage.token || (localStorage.token = Math.random().toString(36).substr(-8))

const headers = {
  Accept: 'application/json',
  Authorization: token
}

const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

const getCategoryPosts = (category) =>
  fetch(`${api}/${category}/posts`, { headers })
    .then(res => res.json())

const getAllPosts = () => 
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())

const getPostDetails = (postId) => 
  fetch(`${api}/posts/${postId}`, { headers })
    .then(res => res.json())

export default {
  getCategories,
  getCategoryPosts,
  getAllPosts,
  getPostDetails
}
