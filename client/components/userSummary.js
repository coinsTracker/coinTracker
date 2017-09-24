import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import UserPanelTabs from './userPanelTabs';
import TransactionLine from './transactionLine'
import { fetchUserTransactions } from '../store'


class UserSummary extends Component {
    componentDidMount () {
        this.props.loadInitialData(this.props.userId)
    }
    render() {
        const {userId, transactions} = this.props

        let totalQty = 0;
        let weightedAvgPriceNum = 0;
        let weightedAvgPriceDen = 0;
        let weightedAvgPrice = 0;
        let sumTotal = 0;
        let sumTotalProfitLoss = 0
        let sumTotalPercent = 0
        transactions.forEach(transaction => {
            totalQty += transaction.purchaseQuantity
            sumTotal += (transaction.purchaseQuantity*transaction.purchasePrice)
            weightedAvgPriceNum += sumTotal
            weightedAvgPriceDen += transaction.purchaseQuantity
            sumTotalProfitLoss += (transaction.purchaseQuantity*(transaction.coin.currentPrice - transaction.purchasePrice))
        })
        weightedAvgPrice = weightedAvgPriceNum/weightedAvgPriceDen
        sumTotalPercent = (sumTotalProfitLoss/sumTotal*100).toFixed(2)

        let portfolioCoins = {}
        transactions.forEach(transaction => {
            if(portfolioCoins[transaction.coin.symbol] !== undefined) {
                portfolioCoins[transaction.coin.symbol].quantity += transaction.purchaseQuantity
                portfolioCoins[transaction.coin.symbol].amount += (transaction.purchasePrice*transaction.purchaseQuantity)
            } else {
                portfolioCoins[transaction.coin.symbol] = transaction.coin
                portfolioCoins[transaction.coin.symbol].quantity = transaction.purchaseQuantity
                portfolioCoins[transaction.coin.symbol].amount = (transaction.purchasePrice*transaction.purchaseQuantity)
            }
        })

        //Chart data
        let colors = ["#2484c1","#0c6197","#4daa4b","#90c469","#daca61","#e4a14b","#e98125","#cb2121","#830909","#923e99","#2484c1","#0c6197","#4daa4b","#90c469","#daca61","#e4a14b","#e98125","#cb2121","#830909","#923e99"]

        let contentData = []

        let i = 0;
        Object.keys(portfolioCoins).forEach(coin => {
            let obj = {
                'label': portfolioCoins[coin].name,
                'value': +(portfolioCoins[coin].currentPrice * portfolioCoins[coin].quantity),
                'color': colors[i]
            }
            i++
            contentData.push(obj)
        })

        var pie = new d3pie("pieChart", {
            "header": {
            "title": {
                // "text": "Portfolio Summary",
                // "fontSize": 24,
                "font": "open sans"
            },
            "subtitle": {
                // "text": "Coins in the portfolio",
                "color": "#999999",
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
            "canvasHeight": 400,
            "canvasWidth": 520,
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


        return (
        <div className="content">
            <div className="container-fluid">

                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="header">
                                <h4 className="title">Summary</h4>
                                <p className="category">Investment portfolio details</p>
                            </div>
                            <div className="content table-responsive table-full-width">
                                <table className='table table-striped'>
                                <thead>
                                    <tr>
                                    <th><h5>Total Investment</h5></th>
                                    <th><h5>Profit/loss</h5></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <td><h5><b>${(sumTotal).toFixed(2)}</b></h5></td>
                                    <td><h5><b>${(sumTotalProfitLoss).toFixed(2)}</b></h5></td>
                                    </tr>
                                </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="header">
                            <h4 className="title">Portfolio Summary</h4>
                            <p className="category">Investment distribution</p>
                            </div>
                            <div className="content table-responsive table-full-width">
                            {/* RENDER THE CHART */}
                            <div id="pieChart"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="header">
                                <h4 className="title">Portfolio composition</h4>
                                <p className="category">Summary of all the coins in your portfolio</p>
                            </div>
                            <div className="content table-responsive table-full-width">
                                <table className='table table-striped'>
                                <thead>
                                <tr>
                                <th>Coin</th>
                                <th>Total quantity</th>
                                <th>Total amount invested</th>
                                <th>Current value USD($)</th>
                                <th>Total Profit/Loss ($)</th>
                                </tr>
                                </thead>
                                <tbody>
                                {Object.keys(portfolioCoins).map(coin => (
                                    <tr key={portfolioCoins[coin].id}>
                                    <td><img src={portfolioCoins[coin].icon} width="25" height="25" /> {portfolioCoins[coin].name}</td>
                                    <td>{portfolioCoins[coin].quantity}</td>
                                    <td>$ {portfolioCoins[coin].amount}</td>
                                    <td>$ {(portfolioCoins[coin].currentPrice * portfolioCoins[coin].quantity).toFixed(2) }</td>
                                    <td>$ {((portfolioCoins[coin].currentPrice * portfolioCoins[coin].quantity) - portfolioCoins[coin].amount).toFixed(2)}</td>
                                    </tr>
                                ))}
                                </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

const mapState = (state) =>{
    return {
        userId: state.user.id,
        transactions: state.transactions
    }
}
const mapDispatch = (dispatch) => {
    return {
      loadInitialData (userId) {
        dispatch(fetchUserTransactions(userId))
      }
    }
  }
export default  connect(mapState, mapDispatch)(UserSummary);
