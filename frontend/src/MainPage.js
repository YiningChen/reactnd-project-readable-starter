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

        <h4 className='header-label'>Categories:</h4>
        <div className='collection'>
          {categories.map(({ name, path }) => (
            <a className='collection-item' key={name} href={path}>
              {name}
            </a>
          ))}
        </div>

        <h4 className='header-label'>Posts:</h4>
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
