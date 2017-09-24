import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import TransactionLine from './transactionLine'
import { fetchUserTransactions} from '../store'

/**
 * COMPONENT
 */
class TransactionsList extends Component {
  componentDidMount () {
    this.props.loadInitialData(this.props.userId)
  }
  render () {
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
    weightedAvgPrice = (weightedAvgPriceNum/weightedAvgPriceDen).toFixed(2)
    sumTotalPercent = (sumTotalProfitLoss/sumTotal*100).toFixed(2)
    sumTotalProfitLoss = sumTotalProfitLoss.toFixed(2)


    return (
      <div className="content">
        <div className="row">
            <div className="col-md-12">
            <div className="card">
                <div className="header">
                    <h4 className="title">All transactions</h4>
                    <p className="category">A complete list of all your transactions</p>
                </div>
                <div className="content table-responsive table-full-width">
                <table className='table table-striped'>
                  <thead>
                  <tr>
                    <th>Coin</th>
                    <th>Purchase date</th>
                    <th>Purchase quantity</th>
                    <th>Purchase price</th>
                    <th>Total</th>
                    <th>Current Price USD($)</th>
                    <th>Profit/Loss in USD($)</th>
                    <th>% profit/loss</th>
                  </tr>
                  </thead>

                  <tbody>
                  {transactions.map(transaction => (<TransactionLine key={transaction.id} transaction={transaction} />))}
                    <tr>
                      <td>
                      </td>
                      <td>
                      <b>Totals</b>
                      </td>
                      <td>
                      <b>{totalQty}</b>
                      </td>
                      <td>
                      {/* <b>${weightedAvgPrice}</b> */}
                      </td>
                      <td>
                      <b>${sumTotal}</b>
                      </td>
                      <td></td>
                      <td><b>$ {sumTotalProfitLoss}</b></td>
                      <td><b>{sumTotalPercent} %</b></td>
                    </tr>
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
  const mapState = (state) => {
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
export default  connect(mapState, mapDispatch)(TransactionsList);
