import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import UserPanelTabs from './userPanelTabs';
import TransactionLine from './transactionLine'


const UserSummary = (props) => {
    const transactions = props.transactions

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

 
    //SAMPLE CHART DATE

    var data = {
    // A labels array that can contain any sort of values
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    // Our series array that contains series objects or in this case series data arrays
    series: [
    [5, 2, 4, 2, 0]
    ]
    };

    // Create a new line chart object where as first parameter we pass in a selector
    // that is resolving to our chart container element. The Second parameter
    // is the actual data object.
    new Chartist.Line('.ct-chart', data);

    
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

            <div class="ct-chart ct-perfect-fourth"></div>
            
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

const mapState = (state) =>{
    return {
        transactions: state.user.transactions
    }
} 

export default  connect(mapState)(UserSummary);