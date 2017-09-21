import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
const CoinLine = (props) => {
  const {coin} = props
  return (
      <tr>
        <td><img src={coin.icon} height="50" width="50" /></td>
        <td>{coin.symbol}</td>
        <td>{coin.name}</td>
        <td>{coin.currentPrice}</td>
        <td>{coin.currentSupply}</td>
        <td>{coin.currentMarketCap}</td>
      </tr>
  )
}
export default CoinLine
