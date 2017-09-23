import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchAllCoins} from '../store'
import CoinLine from './coinLine'

/**
 * COMPONENT
 */
class CoinsList extends Component {
  render() {
    const allCoins = this.props.coins
    return (
      <div className="content">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="header">
              <h4 className="title">All Coin's</h4>
              <p className="category">These are updated every 5 minutes</p>
            </div>
            <div className="content table-responsive table-full-width">
              <table className='table table-striped'>
                <thead>
                  <tr>
                    <th></th>
                    <th>Symbol</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Supply</th>
                    <th>Market Cap</th>
                  </tr>
                </thead>
                <tbody>
                  {allCoins.map(coin => <CoinLine key={coin.id} coin={coin} />)}
                </tbody>
              </table>
            </div>
          </div>
          </div>
      </div>
      </div>
    )
  }
}
/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    coins: state.coins,
    user: state.user
  }
}

export default connect(mapState)(CoinsList)

/**
 * PROP TYPES
 */
CoinsList.propTypes = {
  coins: PropTypes.array,
  user: PropTypes.object
}
