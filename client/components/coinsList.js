import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchAllCoins, fetchCoinHistory} from '../store'
import CoinLine from './coinLine'

/**
 * COMPONENT
 */
class CoinsList extends Component {
  componentDidMount () {
    let val = 'BTC'
    this.props.loadInitialData(val)
  }

  render() {
    const {coins, coinHistory} = this.props

    if(coins.length) {
      // let colors = ["#2484c1","#0c6197","#4daa4b","#90c469","#daca61","#e4a14b","#e98125","#cb2121","#830909","#923e99","#2484c1","#0c6197","#4daa4b","#90c469","#daca61","#e4a14b","#e98125","#cb2121","#830909","#923e99"]
      let colors = ["#cb2121","#830909","#923e99","#2484c1","#0c6197","#4daa4b","#90c469","#daca61","#e4a14b","#e98125","#cb2121","#830909","#923e99","#2484c1","#0c6197","#4daa4b","#90c469","#daca61","#e4a14b","#e98125"]
      let contentData = []

      for(var i=0; i<20; i++) {
        var obj = {
          'label': coins[i].name,
          'value': coins[i].currentMarketCap,
          'color': colors[i]
        }
        contentData.push(obj)
      }

      var pie = new d3pie("pieChart", {
      "header": {
        "title": {
          // "text": "",
          // "fontSize": 24,
          "font": "open sans"
        },
        "subtitle": {
          // "text": "",
          // "color": "#999999",
          // "fontSize": 12,
          "font": "open sans"
        },
        "titleSubtitlePadding": 9
      },
      "footer": {
        "color": "#999999",
        "fontSize": 10,
        "font": "open sans",
        "location": "bottom-left"
      },
      "size": {
        "canvasHeight": 350,
        "canvasWidth": 550,
        "pieInnerRadius": "69%",
        "pieOuterRadius": "90%"
      },
      "data": {
        "sortOrder": "value-desc",
        "content": contentData
      },
      "labels": {
        "outer": {
          "pieDistance": 32
        },
        "inner": {
          "hideWhenLessThanPercentage": 3
        },
        "mainLabel": {
          "fontSize": 11
        },
        "percentage": {
          "color": "#ffffff",
          "decimalPlaces": 0
        },
        "value": {
          "color": "#adadad",
          "fontSize": 11
        },
        "lines": {
          "enabled": true
        },
        "truncation": {
          "enabled": true
        }
      },
      "effects": {
        "load": {
          "speed": 1380
        },
        "pullOutSegmentOnClick": {
          "speed": 380,
          "size": 8
        }
      },
      "misc": {
        "gradient": {
          "enabled": true,
          "percentage": 100
        }
      }
      })
    } //End of the IF CHECK

    // let data = []
    // coinHistory.forEach(value => {
    //   data.push({date: value.time , close: value.marketCap })
    // })

    // console.log(data)

    return (
    <div className="content">
      <div className="row">
        <div className="col-md-12">

          <div className="card">
            <div className="header">
              <h4 className="title">Market Capitalization Distribution</h4>
              <p className="category">Top 10 coins</p>
            </div>
            <div className="content table-responsive table-full-width">
              {/* RENDER THE CHART */}
              <div id="pieChart"></div>

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
                  {coins.map(coin => <CoinLine key={coin.id} coin={coin} />)}
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
    user: state.user,
    // coinHistory: state.coinHistory
  }
}
const mapDispatch = (dispatch) => {
  return {
    loadInitialData (val) {
      dispatch(fetchAllCoins())
      // dispatch(fetchCoinHistory(val))
    }
  }
}
export default connect(mapState, mapDispatch)(CoinsList)

/**
 * PROP TYPES
 */
CoinsList.propTypes = {
  coins: PropTypes.array,
  user: PropTypes.object,
  // coinHistory: PropTypes.array
}
