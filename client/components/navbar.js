import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link, NavLink} from 'react-router-dom'
import {logout} from '../store'


const Navbar = (props) => {
  const {handleClick, isLoggedIn, email} = props

  return (
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar bar1"></span>
            <span className="icon-bar bar2"></span>
            <span className="icon-bar bar3"></span>
          </button>
          <NavLink to="/coins"><b>All Coins</b></NavLink>
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
export default withRouter(connect(mapState, mapDispatch)(Navbar))

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  email: PropTypes.string
}
