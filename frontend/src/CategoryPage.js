import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCategoryPosts } from './actions'

class CategoryPage extends Component {
  componentDidMount () {
    const category = this.props.match.params.category
    this.props.dispatch(fetchCategoryPosts(category))
  }

  render () {
    const category = this.props.match.params.category
    const posts = this.props.posts
    return (
      <div className='post-page'>
        <h1>{category}</h1>
        <ul>
          {posts.map(post => (
            <li key={post.id}>
              {post.title}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ posts }) {
  return { posts }
}

export default connect(mapStateToProps)(CategoryPage)
