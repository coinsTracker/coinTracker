// import React, {Component} from 'react'
// import PropTypes from 'prop-types'
// import {connect} from 'react-redux'
// import TransactionsList from './transactionsList'
// // import {getUserDetailsThunk} from '../store'


// /**
//  * COMPONENT
//  */
// class SingleUser extends Component {
//   componentDidMount(){
//     let userId = +this.props.match.params.userId
//     let transactions = this.props.user
//     console.log(transactions)
//     if (userId) {
//       this.props.getUserDetails(userId)
//     }
//   }

//   render() {
//     return (
//       <div>
//         INSIDE USER PAGE
//         {/* <TransactionsList transactions={userTransactions} />) */}
//       </div>
//     )
//   }
// }

// /**
//  * CONTAINER
//  */
// const mapState = (state) => {
//   return {
//     user: state.user,
//     userTransactions: state.user.transactions
//   }
// }

// const mapDispatch = (dispatch) => {
//   return {
//     getUserDetails (userId) {
//         dispatch(getUserDetailsThunk(userId))
//     }
//   }
// }

// export default connect(mapState, mapDispatch)(SingleUser)

// /**
//  * PROP TYPES
//  */
// SingleUser.propTypes = {
//   user: PropTypes.object,
//   userTransactions: PropTypes.array
// }
