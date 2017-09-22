import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import TransactionsList from './transactionsList'

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {email, user} = props
  console.log(user);

  let transactions = user.transactions

  return (
    <div>
      <h3>Welcome, {email}</h3>
      <TransactionsList transactions={transactions} />
    </div>
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
