/* globals fetch, localStorage */

// TODO: make dynamic
const api = 'http://localhost:3001'

const token = localStorage.token || (localStorage.token = Math.random().toString(36).substr(-8))

const headers = {
  Accept: 'application/json',
  Authorization: token,
  'Content-Type': 'application/json'
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

const getPostComments = (postId) =>
  fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json())

const deletePost = (postId) =>
  fetch(`${api}/posts/${postId}`, {
    headers,
    method: 'DELETE'
  }).then(res => res.json())

const editPost = (postId, data) =>
  fetch(`${api}/posts/${postId}`, {
    headers,
    method: 'PUT',
    body: JSON.stringify(data)
  }).then(res => res.json())

const votePost = (vote) => (postId) => {
  return fetch(`${api}/posts/${postId}`, {
    headers,
    method: 'POST',
    body: JSON.stringify({option: vote})
  }).then(res => res.json())
}

const deleteComment = (commentId) =>
  fetch(`${api}/comments/${commentId}`, {
    headers,
    method: 'DELETE'
  }).then(res => res.json())

const editComment = (commentId, data) =>
  fetch(`${api}/comments/${commentId}`, {
    headers,
    method: 'PUT',
    body: JSON.stringify(data)
  }).then(res => res.json())

const voteComment = (vote) => (commentId) => {
  return fetch(`${api}/comments/${commentId}`, {
    headers,
    method: 'POST',
    body: JSON.stringify({option: vote})
  }).then(res => res.json())
}

function generateUUID () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8) // eslint-disable-line
    return v.toString(16)
  })
}

const createComment = (data) => {
  data.timestamp = Date.now()
  data.id = generateUUID()

  return fetch(`${api}/comments/`, {
    headers,
    method: 'POST',
    body: JSON.stringify(data)
  }).then(res => res.json())
}

const createPost = (data) => {
  data.timestamp = Date.now()
  data.id = generateUUID()

  return fetch(`${api}/posts/`, {
    headers,
    method: 'POST',
    body: JSON.stringify(data)
  }).then(res => res.json())
}

export default {
  getCategories,
  getCategoryPosts,
  getAllPosts,
  getPostDetails,
  getPostComments,
  deletePost,
  editPost,
  votePostUp: votePost('upVote'),
  votePostDown: votePost('downVote'),
  deleteComment,
  editComment,
  voteCommentUp: voteComment('upVote'),
  voteCommentDown: voteComment('downVote'),
  createComment,
  createPost
}
