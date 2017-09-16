import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCategories } from './actions'

class CategoryPage extends Component {
  componentDidMount () {
    this.props.dispatch(fetchCategories())
  }

  render () {
    const { categories } = this.props
    return (
      <div className='category-page'>
        <ul>
          {categories.map(({ name, path }) => (
            <li key={name}>
              <a href={path}>{name}</a>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ categories }) {
  return { categories }
}

export default connect(mapStateToProps)(CategoryPage)
