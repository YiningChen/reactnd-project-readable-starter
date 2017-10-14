import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  fetchCategories,
  fetchAllPosts
} from './actions'

class MainPage extends Component {
  componentDidMount () {
    this.props.dispatch(fetchCategories())
    this.props.dispatch(fetchAllPosts())
  }

  render () {
    const { categories, posts } = this.props
    return (
      <div className='main-page'>
        <h1>Categories</h1>
        <ul>
          {categories.map(({ name, path }) => (
            <li key={name}>
              <a href={path}>{name}</a>
            </li>
          ))}
        </ul>
        <h1>Posts</h1>
        <ul>
          {posts.map(post => (
            <li key={post.id}>
              <a href={post.category + '/' + post.id}>
                {post.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ categories, posts }) {
  return { categories, posts }
}

export default connect(mapStateToProps)(MainPage)
