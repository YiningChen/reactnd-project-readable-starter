import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class PostItem extends Component {
  render () {
    const { id, category, title } = this.props.post

    return (
      <a href={`/${category}/${id}`} className='collection-item'>
        {title}
      </a>
    )
  }
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired
}
