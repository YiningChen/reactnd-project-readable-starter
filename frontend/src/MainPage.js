import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Nav from './Nav'
import NewPost from './NewPost'
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
            <Link className='collection-item' key={name} to={path}>
              {name}
            </Link>
          ))}
        </div>

        <h4 className='header-label'>Posts:</h4>
        <Sorter dispatch={this.props.dispatch} />
        <div className='collection'>
          {posts.map(({id}) => id && <PostItem key={id} id={id} />)}
        </div>

        <NewPost onSubmitAction={fetchAllPosts} />

      </div>
    )
  }
}

function mapStateToProps ({ categories, posts }) {
  return { categories, posts }
}

export default connect(mapStateToProps)(MainPage)
