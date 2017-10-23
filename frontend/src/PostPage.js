import React, { Component } from 'react'
import { connect } from 'react-redux'
import Nav from './Nav'
import PostItem from './PostItem'
import BaseItem from './BaseItem'
import {
  fetchPost,
  deleteComment,
  editComment,
  voteCommentUp,
  voteCommentDown,
  createComment
} from './actions'

const DEFAULT_STATE = {
  newCommentBody: '',
  newCommentAuthor: ''
}

class PostPage extends Component {
  constructor (props) {
    super(props)

    const postId = props.match.params.postId
    props.dispatch(fetchPost(postId))

    this.state = DEFAULT_STATE
  }

  createNavLinks (params) {
    const {category, postId} = params
    return [{
      path: `/${category}`,
      title: category
    }, {
      path: `/${category}/${postId}`,
      title: 'Post Details'
    }]
  }

  delete (id) {
    this.props.dispatch(deleteComment(id))
  }

  edit (id, data) {
    const formData = {
      body: data.body,
      timestamp: Date.now()
    }
    this.props.dispatch(editComment(id, formData))
  }

  voteUp (id) {
    this.props.dispatch(voteCommentUp(id))
  }

  voteDown (id) {
    this.props.dispatch(voteCommentDown(id))
  }

  setStateValue (key, event) {
    this.setState({ [key]: event.target.value })
  }

  resetState () {
    this.setState(DEFAULT_STATE)
  }

  createNewComment (event) {
    const { dispatch, post } = this.props
    const data = {
      body: this.state.newCommentBody,
      author: this.state.newCommentAuthor,
      parentId: post.id
    }
    dispatch(createComment(data))

    // don't reload page
    event.preventDefault()

    // empty out form
    this.resetState()
  }

  render () {
    const post = this.props.post || {}
    const { comments, match } = this.props
    const navLinks = this.createNavLinks(match.params)

    console.warn(post)
    console.warn(comments)
    return (
      <div className='post-page'>
        <Nav links={navLinks} />

        {/* Post Details */}
        {post.id && <PostItem id={post.id} />}

        {/* Comments */}
        <div className='collection'>
          {comments.map((comment) => (
            <div key={comment.id} className='collection-item avatar'>
              <p>{comment.body}</p>
              <BaseItem
                author={comment.author}
                body={comment.body}
                voteScore={comment.voteScore}
                deleteSelf={() => this.delete(comment.id)}
                edit={(data) => this.edit(comment.id, data)}
                voteUp={() => this.voteUp(comment.id)}
                voteDown={() => this.voteDown(comment.id)}
              />
            </div>
          ))}
        </div>

        {/* Add Comment */}
        <div className='card-panel teal lighten-2'>Add New Comment:</div>
        <form>
          <strong>New Comment</strong>
          <input type='text'
            onChange={event => this.setStateValue('newCommentBody', event)}
            value={this.state.newCommentBody}
          />

          <strong>Author</strong>
          <input type='text'
            onChange={event => this.setStateValue('newCommentAuthor', event)}
            value={this.state.newCommentAuthor}
          />

          <br />
          <button type='submit' className='btn' onClick={this.createNewComment.bind(this)}>
            New Comment<i className='material-icons right'>send</i>
          </button>
        </form>

      </div>
    )
  }
}

function mapStateToProps ({posts, comments}) {
  return {
    post: posts[0],
    comments
  }
}

export default connect(mapStateToProps)(PostPage)
