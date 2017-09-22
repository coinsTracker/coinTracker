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
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Coin</th>
              <th>Purchase Date</th>
              <th>Purchase Quantity</th>
              <th>Purchase Price</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction => <TransactionLine key={transaction.id} transaction={transaction} />)}
          </tbody>
        </table>
      </div>
    )
}

export default TransactionsList
