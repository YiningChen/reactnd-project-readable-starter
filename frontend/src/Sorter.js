import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { sortPosts } from './actions'

export default class Sorter extends Component {
  sortBy (field) {
    this.props.dispatch(sortPosts(field))
  }

  render () {
    return (
      <div className='sorter'>
        <div className='chip'
          onClick={() => this.sortBy('timestamp')}>
          Sort By Most Recent
        </div>
        <div className='chip'
          onClick={() => this.sortBy('voteScore')}>
          Sort By Most Votes
        </div>
      </div>
    )
  }
}

Sorter.propTypes = {
  dispatch: PropTypes.func.isRequired
}
