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
  voteCommentDown
} from './actions'

class PostPage extends Component {
  componentDidMount () {
    const postId = this.props.match.params.postId
    this.props.dispatch(fetchPost(postId))
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

  render () {
    const { post, comments } = this.props
    const navLinks = this.createNavLinks(post)

    console.warn(post)
    console.warn(comments)
    return (
      <div className='post-page'>

        <Nav links={navLinks} />

        {post.id && <PostItem id={post.id} />}

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
