import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER_TRANSACTIONS = 'GET_USER_TRANSACTIONS'

/**
 * INITIAL STATE
 */
const transactions = []

/**
 * ACTION CREATORS
 */
const getUserTransactions = (transactions) => ({type: GET_USER_TRANSACTIONS, transactions})

/**
 * THUNK CREATORS
 */
export const fetchUserTransactions = (userId) =>
  dispatch =>
  {
    console.log("***** LOADING TRANSACTIONS for: ", userId)
    if (userId) {
      return axios.get(`/api/transactions/${userId}`)
      .then(res =>{
        console.log(res.data)
        dispatch(getUserTransactions(res.data))})
      .catch(err => console.log(err))
    }
  }

/**
 * REDUCER
 */
export default function (state = transactions, action) {
  switch (action.type) {
    case GET_USER_TRANSACTIONS:
      return action.transactions
    default:
      return state
  }
}
