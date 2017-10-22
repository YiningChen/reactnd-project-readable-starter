import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class BaseItem extends Component {
  constructor (props) {
    super(props)
    this.state = {
      editing: false,
      title: '',
      body: ''
    }
  }

  editing (state) {
    this.setState({editing: state})
  }

  setFormTitle (title) {
    this.setState({title})
  }

  setFormBody (body) {
    this.setState({body})
  }

  handleSubmit (event) {
    const {title, body} = this.state
    this.props.edit && this.props.edit({title, body})
    this.editing(false)
    event.preventDefault()
  }

  render () {
    const {
      author,
      title,
      body,
      voteScore,
      voteUp,
      voteDown,
      deleteSelf
    } = this.props

    return (
      <div>
        {/* details */}
        <p>
          <strong>author: </strong>{author}<br />
          <strong>score: </strong>{voteScore}<br />
        </p>
        {/* upvote button */}
        <a className='base-item btn' onClick={voteUp}>
          <i className='material-icons'>arrow_upward</i>
        </a>
        {/* downvote button */}
        <a className='base-item btn' onClick={voteDown}>
          <i className='material-icons'>arrow_downward</i>
        </a>
        {/* delete button */}
        <a className='base-item btn' onClick={deleteSelf}>
          <i className='material-icons'>delete</i>
        </a>
        {/* edit button */}
        <a className='base-item btn' onClick={() => {
          if (title) this.setFormTitle(title)
          this.setFormBody(body)
          this.editing(true)
        }}>
          <i className='material-icons'>edit</i>
        </a>
        {/* edit form */}
        {this.state.editing &&
          <form>
            {title && <strong>Title:</strong>}
            {title &&
            <input type='text'
              onChange={event => this.setFormTitle(event.target.value)}
              value={this.state.title}
            />}
            <strong>Body:</strong>
            <textarea value={this.state.body}
              onChange={event => this.setFormBody(event.target.value)}
            />
            <input type='submit' value='Submit' onClick={this.handleSubmit.bind(this)} />
          </form>
        }
      </div>
    )
  }
}

BaseItem.propTypes = {
  author: PropTypes.string.isRequired,
  title: PropTypes.string,
  body: PropTypes.string.isRequired,
  voteScore: PropTypes.number.isRequired,
  deleteSelf: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  voteUp: PropTypes.func.isRequired,
  voteDown: PropTypes.func.isRequired
}
