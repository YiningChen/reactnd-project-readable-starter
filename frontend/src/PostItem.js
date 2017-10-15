import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchPostComments } from './actions'

class PostItem extends Component {
  componentDidMount () {
    const id = this.props.id
    this.props.dispatch(fetchPostComments(id))
  }

  render () {
    const { id, posts } = this.props
    const post = posts.find(post => post.id === id)
    const {
      category,
      title,
      author,
      comments,
      voteScore
    } = post
    console.warn(post)

    return (
      <a href={`/${category}/${id}`} className='collection-item avatar'>
        <span className='title'>{title}</span>
        <p>
          <strong>author: </strong>
          {author}<br />
          <strong>comments: </strong>
          {comments ? comments.length : 0}<br />
          <strong>score: </strong>
          {voteScore}<br />
        </p>
      </a>
    )
  }
}

PostItem.propTypes = {
  id: PropTypes.string.isRequired
}

function mapStateToProps ({ posts }) {
  return { posts }
}

export default connect(mapStateToProps)(PostItem)
