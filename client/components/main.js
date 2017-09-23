import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link, NavLink} from 'react-router-dom'
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
    <div className="sidebar" data-background-color="black" data-active-color="info">

      <div className="sidebar-wrapper">
            <div className="logo">
                <NavLink to="/" className="simple-text">
                    coinTracker
                </NavLink>
            </div>

            <ul className="nav">
                <li className="active">
                    <NavLink to="/home/summary">
                        <i className="ti-panel"></i>
                        <p>Dashboard</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/home/profile">
                        <i className="ti-user"></i>
                        <p>User Profile</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/home/transactions">
                        <i className="ti-view-list-alt"></i>
                        <p>Transaction List</p>
                    </NavLink>
                </li>
                {/* <li>
                    <a href="typography.html">
                        <i className="ti-text"></i>
                        <p>Typography</p>
                    </a>
                </li> */}
                <li>
                    <a href="">
                        <i className="ti-pencil-alt2"></i>
                        <p>Add Transactions</p>
                    </a>
                </li>
                <li>
                    <a href="">
                        <i className="ti-map"></i>
                        <p>Graphs</p>
                    </a>
                </li>
                {/* <li>
                    <a href="notifications.html">
                        <i className="ti-bell"></i>
                        <p>Notifications</p>
                    </a>
                </li> */}
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
          <Link to="/coins">Market</Link>
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
