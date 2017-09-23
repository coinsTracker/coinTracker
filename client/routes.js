import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Router} from 'react-router'
import {Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import {Main, Login, Signup, UserHome, CoinsList, UserSummary, UserProfile } from './components'
import {me, fetchAllCoins} from './store'


/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData()
  }

  render () {
    const {isLoggedIn} = this.props

    return (
      <div className="wrapper">
      <Router history={history}>
        <Main>
          <Switch>
            <Route path='/coins' component={CoinsList} />
            {/* <Route path='/coins' render={()=> <CoinsList coins={coins} />} /> */}
            {/* Routes placed here are available to all visitors */}
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            {
              isLoggedIn &&
                <Switch>
                  {/* Routes placed here are only available after logging in */}
                  <Route exact path='/home' component={UserSummary} />
                  <Route exact path='/home/profile' component={UserProfile} />
                  <Route exact path='/home/summary' component={UserSummary} />
                  <Route exact path='/home/transactions' component={UserHome} />
                  {/* <Route path='/users/:userId' component={SingleUser} /> */}
                </Switch>
            }
            {/* Displays our Login component as a fallback */}
            <Route component={CoinsList} />
          </Switch>
        </Main>
      </Router>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    coins: state.coins
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(me())
      dispatch(fetchAllCoins())
    }
  }
}

export default connect(mapState, mapDispatch)(Routes)

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
