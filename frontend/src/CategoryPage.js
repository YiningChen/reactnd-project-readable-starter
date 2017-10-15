import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCategoryPosts } from './actions'
import Nav from './Nav'
import PostItem from './PostItem'

class CategoryPage extends Component {
  componentDidMount () {
    const category = this.props.match.params.category
    this.props.dispatch(fetchCategoryPosts(category))
  }

  render () {
    const { posts } = this.props
    const category = this.props.match.params.category
    const navLinks = [{
      path: `/${category}`,
      title: category
    }]

    return (
      <div className='category-page'>
        <Nav links={navLinks} />
        <div className='collection'>
          {posts.map(post =>
            <PostItem key={post.id} post={post} />
          )}
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ posts }) {
  return { posts }
}

export default connect(mapStateToProps)(CategoryPage)
