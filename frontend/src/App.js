import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import CategoryPage from './CategoryPage'
import PostPage from './PostPage'
import './App.css'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Route exact path='/' component={CategoryPage} />
        <Route path='/:category' component={PostPage} />
      </div>
    )
  }
}

export default App
