import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {NavLink} from 'react-router-dom'

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div className="content">
      <div className="row">
        <div className="col-md-12">

          <div className="card">
              <div className="header">
                  <h4 className="title">Authentication</h4>
                  <p className="category">Login details</p>
              </div>
              <div className="form-group">
                <form onSubmit={handleSubmit} name={name}>
                <div>
                  <label htmlFor='email'><small>Email</small></label>
                  <input name='email' type='text' className="form-control border-input" />
                </div>
                <div>
                  <label htmlFor='password'><small>Password</small></label>
                  <input name='password' type='password' className="form-control border-input"/>
                </div>
                <div>
                  <button type='submit' className="btn btn-info btn-fill btn-wd">{displayName}</button>
                </div>
                {error && error.response && <div> {error.response.data} </div>}
                </form>
                {/* <a href='/auth/google'>{displayName} with Google</a> */}
                <NavLink to='/auth/google'>{displayName} with Google</NavLink>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit (evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
