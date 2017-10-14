import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPostDetails } from './actions'

class PostPage extends Component {
  componentDidMount () {
    const postId = this.props.match.params.postId
    this.props.dispatch(fetchPostDetails(postId))
  }

  render () {
    const { details } = this.props
    return (
      <div className='post-page'>
        <h1>{details.title}</h1>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return { details: state.postDetails }
}

export default connect(mapStateToProps)(PostPage)
