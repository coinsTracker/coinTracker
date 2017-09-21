import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ALL_COINS = 'GET_ALL_COINS'
const GET_COIN = 'GET_COIN'

/**
 * INITIAL STATE
 */
const coins = []

/**
 * ACTION CREATORS
 */
const getAllCoins = coins => ({type: GET_ALL_COINS, coins})
const getCoin = (id) => ({type: GET_COIN, coin})

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
    // case GET_COIN:
    //   return Object.assign([], state, coins.filter(singleCoin => action.coin)
    default:
      return state
  }
}
