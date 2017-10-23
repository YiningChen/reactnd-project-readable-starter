import React, { Component } from 'react'
import { connect } from 'react-redux'
import Nav from './Nav'
import PostItem from './PostItem'
import Sorter from './Sorter'
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
        <Nav />

        <h4 className='header-label'>Categories:</h4>
        <div className='collection'>
          {categories.map(({ name, path }) => (
            <a className='collection-item' key={name} href={path}>
              {name}
            </a>
          ))}
        </div>

        <h4 className='header-label'>Posts:</h4>
        <Sorter dispatch={this.props.dispatch} />
        <div className='collection'>
          {posts.map(({id}) => id && <PostItem key={id} id={id} />)}
        </div>

      </div>
    )
  }
}

function mapStateToProps ({ categories, posts }) {
  return { categories, posts }
}

export default connect(mapStateToProps)(MainPage)
