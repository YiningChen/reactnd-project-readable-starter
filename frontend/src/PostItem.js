import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import BaseItem from './BaseItem'
import {
  fetchPostComments,
  deletePost,
  editPost,
  votePostUp,
  votePostDown
} from './actions'

class PostItem extends Component {
  componentDidMount () {
    const {dispatch, id} = this.props
    dispatch(fetchPostComments(id))
  }

  voteUp () {
    const {dispatch, id} = this.props
    dispatch(votePostUp(id))
  }

  voteDown () {
    const {dispatch, id} = this.props
    dispatch(votePostDown(id))
  }

  delete () {
    const {dispatch, id} = this.props
    dispatch(deletePost(id))
  }

  edit (data) {
    const {dispatch, id} = this.props
    dispatch(editPost(id, data))
  }

  render () {
    const { id, posts } = this.props
    const post = posts.find(post => post.id === id)
    const {
      category,
      title,
      body,
      author,
      comments,
      voteScore
    } = post

    return (
      <div className='collection-item avatar'>
        <a href={`/${category}/${id}`}>
          <i className='material-icons circle teal'>link</i>
        </a>
        <span className='post-item title'>{title}</span>
        <p>
          <strong>comments: </strong>
          {comments ? comments.length : 0}<br />
        </p>
        <BaseItem
          author={author}
          title={title}
          body={body}
          voteScore={voteScore}
          deleteSelf={this.delete.bind(this)}
          edit={this.edit.bind(this)}
          voteUp={this.voteUp.bind(this)}
          voteDown={this.voteDown.bind(this)}
        />
      </div>
    )
  }
}

PostItem.propTypes = {
  id: PropTypes.string.isRequired,
  posts: PropTypes.array
}

function mapStateToProps ({ posts }) {
  return { posts }
}

export default connect(mapStateToProps)(PostItem)
