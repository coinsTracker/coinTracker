import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import user from './user'
import coins from './coin'
import transactions from './transaction'
import coinHistory from './coinHistory'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({user, coins, transactions, coinHistory})
const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware, createLogger({collapsed: true})))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './coin'
export * from './transaction'
export * from './coinHistory'
