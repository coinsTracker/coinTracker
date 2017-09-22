import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import TransactionLine from './transactionLine'

/**
 * COMPONENT
 */
const TransactionsList = (props) => {
    const transactions = props.transactions
    console.log(props)
    let totalQty = 0;
    let weightedAvgPriceNum = 0;
    let weightedAvgPriceDen = 0;
    let weightedAvgPrice = 0;
    let sumTotal = 0;
    transactions.forEach(transaction => {
      totalQty += transaction.purchaseQuantity
      sumTotal += (transaction.purchaseQuantity*transaction.purchasePrice)
      weightedAvgPriceNum += sumTotal
      weightedAvgPriceDen += transaction.purchaseQuantity
    })
    weightedAvgPrice = weightedAvgPriceNum/weightedAvgPriceDen
    //weighted average ((A2*B2)+(A3*B3))/SUM(B2:B3)

    return (
      <div>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>Coin</th>
              <th>Purchase date</th>
              <th>Purchase quantity</th>
              <th>Purchase price per coin</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map(transaction => (<TransactionLine key={transaction.id} transaction={transaction} />))}
            <tr>
            <td>
            {/* LEAVE THIS EMPTY */}
            </td>
            <td>
            Totals
            </td>
            <td>
              {totalQty}
            </td>
            <td>
              {weightedAvgPrice}
            </td>
            <td>
              {sumTotal}
            </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
}

export default TransactionsList
