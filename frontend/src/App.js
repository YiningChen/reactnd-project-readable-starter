import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import CategoryPage from './CategoryPage'
import './App.css'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Route exact path='/' component={CategoryPage} />
      </div>
    )
  }
}

export default App
