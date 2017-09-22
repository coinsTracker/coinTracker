import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

class TransactionLine extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }
 render(){
   const transaction = this.props.transaction
   return(<tr>
      <td><img src={transaction.coin.icon} width="25" height="25" /> {transaction.coin.name}</td>
      <td>{transaction.purchaseDate}</td>
      <td>{transaction.purchaseQuantity}</td>
      <td>{transaction.purchasePrice}</td>
      <td>{transaction.purchasePrice*transaction.purchaseQuantity}</td>
    </tr>)
 }
}

const mapStateToProps = (state, ownProps) => {
  return {
    transaction: ownProps.transaction,
  }
}

export default connect(mapStateToProps)(TransactionLine)
