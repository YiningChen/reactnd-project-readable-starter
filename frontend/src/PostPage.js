import React, { Component } from 'react'

class PostPage extends Component {
  render () {
    const category = this.props.match.params.category
    return (
      <div className='post-page'>
        <h1>{category}</h1>
      </div>
    )
  }
}

export default PostPage
