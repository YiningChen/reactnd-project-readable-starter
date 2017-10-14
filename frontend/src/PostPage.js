import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  fetchPostDetails,
  fetchPostComments
} from './actions'

class PostPage extends Component {
  componentDidMount () {
    const postId = this.props.match.params.postId
    this.props.dispatch(fetchPostDetails(postId))
    this.props.dispatch(fetchPostComments(postId))
  }

  render () {
    const { details, comments } = this.props
    console.warn(details)
    console.warn(comments)
    return (
      <div className='post-page'>
        <h1>{details.title}</h1>
        <ul>
          {comments.map((comment) => (
            <li>
              {comment.body}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return { 
    details: state.postDetails,
    comments: state.postComments
  }
}

export default connect(mapStateToProps)(PostPage)
