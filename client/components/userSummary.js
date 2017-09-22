import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import UserPanelTabs from './userPanelTabs';
import TransactionLine from './transactionLine'


const UserSummary = (props) => {
    const transactions = props.transactions
    console.log(props)
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

    console.log(portfolioCoins)


    return (
    <div>
    <UserPanelTabs />
    <h2>Summary</h2>
    <h3>Total Investment: ${(sumTotal).toFixed(2)}</h3>
    <h3>Profit/loss:      ${(sumTotalProfitLoss).toFixed(2)}</h3>
    <hr/>

    {/* <TransactionLine key={portfolioCoins[coin].id} transaction={portfolioCoins[coin]} /> */}

    <h4>Portfolio composition</h4>
    {Object.keys(portfolioCoins).map(coin => (
        <div key={portfolioCoins[coin].id}>
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
            <tr>
            <td><img src={portfolioCoins[coin].icon} width="25" height="25" /> {portfolioCoins[coin].name}</td>
            <td>{portfolioCoins[coin].quantity}</td>
            <td>$ {portfolioCoins[coin].amount}</td>
            <td>$ {(portfolioCoins[coin].currentPrice * portfolioCoins[coin].quantity).toFixed(2) }</td>
            <td>$ {((portfolioCoins[coin].currentPrice * portfolioCoins[coin].quantity) - portfolioCoins[coin].amount).toFixed(2)}</td>
            </tr>
            </tbody>
        </table>
        <br /><br /><br />
        </div>
    ))}

    </div>
    )
}

const mapState = (state) =>{
    return {
        transactions: state.user.transactions
    }
} 

export default  connect(mapState)(UserSummary);