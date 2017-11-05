import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Nav extends Component {
  render () {
    const { links } = this.props

    return (
      <nav>
        <div className='nav-wrapper'>
          <div className='col s12'>
            <a className='breadcrumb' href='/'>Main Page</a>
            {links && links.map(({ path, title }) => (
              <a
                key={title + path}
                className='breadcrumb'
                href={path}
              >
                {title}
              </a>
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
