import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import UserPanelTabs from './userPanelTabs';
import TransactionLine from './transactionLine'
import { fetchUserTransactions} from '../store'

// const UserSummary = (props) => {
class UserSummary extends Component {
    componentDidMount () {
        console.log('***CDM - ', this.props.userId)
        this.props.loadInitialData(this.props.userId)
    }
    render() {
        const {userId, transactions} = this.props
        console.log ('USERID: ', userId)
        // const transactions = props.transactions

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

        return (
        <div className="content">
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

                <div className="card">
                    <div className="header">
                    <h4 className="title">Chart</h4>
                    <p className="category">Investment distribution</p>
                    </div>
                    <div className="content table-responsive table-full-width">
                    {/* RENDER THE CHART */}
                    {/* <div className="ct-chart .ct-minor-sixth"></div> */}
                    </div>
                </div>

                <br />
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
                        <th>Total Profit/Loss</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Object.keys(portfolioCoins).map(coin => (
                        <tr>
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
        )
    }
}

const mapState = (state) =>{
    return {
        // transactions: state.user.transactions
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
