import React, { Component } from 'react'
import api from './api'

class PostPage extends Component {
  componentDidMount () {
    const postId = this.props.match.params.postId
    console.warn('POST PAGE')
    console.warn(api.getPostDetails(postId))
  }

  render () {
    return <div />
  }
}

export default PostPage
