import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, NavLink} from 'react-router-dom'

const Sidebar = (props) => {
  const {isLoggedIn} = props
  return (
    <div>
      <div className="sidebar" data-background-color="black" data-active-color="info">
        <div className="sidebar-wrapper">
              <div className="logo">
                  <NavLink to="/coins" className="simple-text">
                      coinTracker
                  </NavLink>
              </div>
              <ul className="nav">
              {/* className="active" */}
                  <li>
                      <NavLink to="/home/summary" >
                          <i className="ti-panel"></i>
                          <p>Dashboard</p>
                      </NavLink>
                  </li>
                  <li>
                      <NavLink to="/home/transactions" >
                          <i className="ti-view-list-alt"></i>
                          <p>Transaction List</p>
                      </NavLink>
                  </li>
                  <li>
                      <NavLink to="/home/transactions/add" >
                          <i className="ti-pencil-alt2"></i>
                          <p>Add Transactions</p>
                      </NavLink>
                  </li>
                  <li >
                    <NavLink to="/home/profile" >
                        <i className="ti-user"></i>
                        <p>User Profile</p>
                    </NavLink>
                  </li>
                  {/* <li>
                      <NavLink to="/home/transactions" >
                          <i className="ti-map"></i>
                          <p>Graphs</p>
                      </NavLink>
                  </li> */}
              </ul>
        </div>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState)(Sidebar))

/**
 * PROP TYPES
 */
Sidebar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
}
