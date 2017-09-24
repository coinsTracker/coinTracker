import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER_TRANSACTIONS = 'GET_USER_TRANSACTIONS'
const ADD_TRANSACTION = 'ADD_TRANSACTION'

/**
 * INITIAL STATE
 */
const transactions = []

/**
 * ACTION CREATORS
 */
const getUserTransactions = (transactions) => ({type: GET_USER_TRANSACTIONS, transactions})

/**
 * ACTION CREATORS
 */
const addTransactionAction = (transaction) => ({type:ADD_TRANSACTION, transaction})

/**
 * THUNK CREATORS
 */
export const addTransaction = (transactionData) =>
  dispatch => {
    return axios.post('/api/transactions', transactionData)
    .then(res => res.data)
    .then(transaction => dispatch(addTransactionAction(transaction)))
    .catch(err => console.log(err))
  }

export const fetchUserTransactions = (userId) =>
  dispatch =>
  {
    if (userId) {
      return axios.get(`/api/transactions/${userId}`)
      .then(res =>{
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
    case ADD_TRANSACTION:
      return [...action.transactions, action.transaction]  
    default:
      return state
  }
}
