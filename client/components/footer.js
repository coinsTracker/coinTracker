import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, NavLink} from 'react-router-dom'

const Footer = (props) => {
  return (
    <div className="footer">
      <div className="container-fluid">
        <div className="copyright pull-right">
          © 2017 - Made by Bojan and Ranjeet Sodhi
        </div>
      </div>
    </div>
  )
}


// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect()(Footer))

