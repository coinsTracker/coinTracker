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

    //Chart data
    var data = {
      // A labels array that can contain any sort of values
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      // Our series array that contains series objects or in this case series data arrays
      series: [
        [5, 2, 4, 2, 0]
      ]
    };

    new Chartist.Line('.ct-chart', data);


    return (
      <div className="content">
      <div className="row">
        <div className="col-md-12">

        <div className="card">
        <div className="header">
        <h4 className="title">Chart</h4>
        <p className="category">Investment distribution</p>
        </div>
        <div className="content table-responsive table-full-width">
        {/* RENDER THE CHART */}
        <div className="ct-chart .ct-minor-sixth"></div>
        </div>
        </div>


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
