import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout} from '../store'
// import Navbar from './navbar'

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = (props) => {
  const {children, handleClick, isLoggedIn, email} = props

  return (
    <div>
    <div className="sidebar" data-background-color="white" data-active-color="danger">

      <div className="sidebar-wrapper">
            <div className="logo">
                <a href="http://www.creative-tim.com" className="simple-text">
                    Creative Tim
                </a>
            </div>

            <ul className="nav">
                <li className="active">
                    <a href="dashboard.html">
                        <i className="ti-panel"></i>
                        <p>Dashboard</p>
                    </a>
                </li>
                <li>
                    <a href="user.html">
                        <i className="ti-user"></i>
                        <p>User Profile</p>
                    </a>
                </li>
                <li>
                    <a href="table.html">
                        <i className="ti-view-list-alt"></i>
                        <p>Table List</p>
                    </a>
                </li>
                <li>
                    <a href="typography.html">
                        <i className="ti-text"></i>
                        <p>Typography</p>
                    </a>
                </li>
                <li>
                    <a href="icons.html">
                        <i className="ti-pencil-alt2"></i>
                        <p>Icons</p>
                    </a>
                </li>
                <li>
                    <a href="maps.html">
                        <i className="ti-map"></i>
                        <p>Maps</p>
                    </a>
                </li>
                <li>
                    <a href="notifications.html">
                        <i className="ti-bell"></i>
                        <p>Notifications</p>
                    </a>
                </li>
        <li className="active-pro">
                    <a href="upgrade.html">
                        <i className="ti-export"></i>
                        <p>Upgrade to PRO</p>
                    </a>
                </li>
            </ul>
      </div>
    </div>


    <div className="main-panel">
      <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar bar1"></span>
          <span className="icon-bar bar2"></span>
          <span className="icon-bar bar3"></span>
          </button>
          <Link to="/coins" className="navbar-brand">coinTracker</Link>
        </div>
      {
          isLoggedIn
            ? <div className='navbar-right'>
              {/* The navbar will show these links after you log in */}
              <Link to='/home'>Home</Link>
              <a href='#' onClick={handleClick}>({email}) Logout</a>
            </div>
            : <div className='navbar-right'>
              {/* The navbar will show these links before you log in */}
              <Link to='/login'>
                <i className="ti-settings"></i><p>Login</p>
              </Link>
              <Link to='/signup'>
              <i className="ti-panel"></i><p>Sign Up</p></Link>
            </div>
      }
      </div>
      </nav>
      {children}
    </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    email: state.user.email
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick () {
      dispatch(logout())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  email: PropTypes.string
}
