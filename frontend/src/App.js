import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCategories } from './actions'
import './App.css'

class App extends Component {
  componentDidMount () {
    this.props.boundFetchCategories()
  }

  render () {
    const { categories } = this.props
    return (
      <div className='App'>
        <ul>
          {categories.map(({ name }) => <li key={name}>{name}</li>)}
        </ul>
      </div>
    )
  }
}

function matchStateToProps ({ categories }) {
  return { categories }
}

function matchDispatchToProps (dispatch) {
  return {
    boundFetchCategories: () => dispatch(fetchCategories())
  }
}

export default connect(matchStateToProps, matchDispatchToProps)(App)
