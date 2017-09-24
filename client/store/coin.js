import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ALL_COINS = 'GET_ALL_COINS'

/**
 * INITIAL STATE
 */
const coins = []

/**
 * ACTION CREATORS
 */
const getAllCoins = coins => ({type: GET_ALL_COINS, coins})

/**
 * THUNK CREATORS
 */
export const fetchAllCoins = () =>
  dispatch =>
    axios.get('/api/coins')
      .then(res =>
        dispatch(getAllCoins(res.data)))
      .catch(err => console.log(err))


/**
 * REDUCER
 */
export default function (state = coins, action) {
  switch (action.type) {
    case GET_ALL_COINS:
      return action.coins
    default:
      return state
  }
}
