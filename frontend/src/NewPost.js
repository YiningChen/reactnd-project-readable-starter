import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import api from './api'
import { fetchCategories } from './actions'

const DEFAULT_STATE = {
  title: '',
  body: '',
  author: '',
  category: 'default'
}

class NewPost extends Component {
  constructor (props) {
    super(props)
    this.state = DEFAULT_STATE

    if (props.categories.length < 1) {
      props.dispatch(fetchCategories())
    }
  }

  setStateValue (key, event) {
    this.setState({ [key]: event.target.value })
  }

  resetState () {
    this.setState(DEFAULT_STATE)
  }

  handleSubmit (event) {
    const { dispatch, onSubmitAction } = this.props

    // create post via api, then update state
    api.createPost(this.state)
      .then(() => dispatch(onSubmitAction()))

    // don't reload page
    event.preventDefault()

    // empty out form
    this.resetState()
  }

  render () {
    const { categories } = this.props

    return (
      <div>
        <div className='card-panel teal lighten-2'>Add New Post:</div>
        <form className='new-post-form'>
          <strong>Title:</strong>
          <input type='text'
            className='teal lighten-5'
            onChange={event => this.setStateValue('title', event)}
            value={this.state.title}
          />

          <strong>Body:</strong>
          <input type='text'
            className='teal lighten-5'
            onChange={event => this.setStateValue('body', event)}
            value={this.state.body}
          />

          <strong>Author:</strong>
          <input type='text'
            className='teal lighten-5'
            onChange={event => this.setStateValue('author', event)}
            value={this.state.author}
          />

          <strong>Category:</strong>
          <select className='browser-default teal lighten-5'
            onChange={event => this.setStateValue('category', event)}
            value={this.state.category}
          >
            <option disabled value='default'>Pick One</option>
            {categories.map(({name}) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>

          <br />
          <button type='submit' className='btn' onClick={this.handleSubmit.bind(this)}>
            New Post<i className='material-icons right'>send</i>
          </button>
        </form>
      </div>
    )
  }
}

NewPost.propTypes = {
  onSubmitAction: PropTypes.func.isRequired
}

function mapStateToProps ({ categories }) {
  return { categories }
}
export default connect(mapStateToProps)(NewPost)
