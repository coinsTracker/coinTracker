import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import TransactionsList from './transactionsList'
import UserSummary from './userSummary'
import UserPanelTabs from './userPanelTabs'

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {email, user} = props

  let transactions = user.transactions

  return (
    <TransactionsList />
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email,
    user: state.user
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string,
  user: PropTypes.object
}

      {/* <UserPanelTabs />       <TransactionsList />*/}
