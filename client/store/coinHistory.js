import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_COIN_HISTORY = 'GET_COIN_HISTORY'

/**
 * INITIAL STATE
 */
const coinHistory = []

/**
 * ACTION CREATORS
 */
const getCoinHistory = coinHistory => ({type: GET_COIN_HISTORY, coinHistory})

/**
 * THUNK CREATORS
 */
export const fetchCoinHistory = (symbol) =>
  dispatch => {
    console.log('** GOT TO Fetch Coin History ', symbol)
    axios.get(`/api/coinHistory/${symbol}`)
      .then(res =>
        dispatch(getCoinHistory(res.data)))
      .catch(err => console.log(err))
      }

/**
 * REDUCER
 */
export default function (state = coinHistory, action) {
  switch (action.type) {
    case GET_COIN_HISTORY:
      return action.coinHistory
    default:
      return state
  }
}
