import React, { Component } from 'react'
import { connect } from 'react-redux'
import Nav from './Nav'
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

  createNavLinks (post) {
    const {category, id} = post
    return [{
      path: `/${category}`,
      title: category
    }, {
      path: `/${category}/${id}`,
      title: 'Post Details'
    }]
  }

  render () {
    const { details, comments } = this.props
    const navLinks = this.createNavLinks(details)

    console.warn(details)
    console.warn(comments)
    return (
      <div className='post-page'>
        <Nav links={navLinks} />
        <h5>{details.title}</h5>
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>
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
