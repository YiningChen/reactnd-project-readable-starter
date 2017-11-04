import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export default class Nav extends Component {
  render () {
    const { links } = this.props

    return (
      <nav>
        <div className='nav-wrapper'>
          <div className='col s12'>
            <Link className='breadcrumb' to='/'>Main Page</Link>
            {links && links.map(({ path, title }) => (
              <Link
                key={title + path}
                className='breadcrumb'
                to={path}
              >
                {title}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    )
  }
}

Nav.propTypes = {
  links: PropTypes.array
}
