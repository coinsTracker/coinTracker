import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import axios from 'axios'
import history from '../history'
import { addTransaction } from '../store'

class AddTransaction extends Component{
    constructor(props){
        super(props)
        this.state = {
            userId: this.props.user.id,
            coinId: 1,
            date: Date.now(),
            quantity: 0,
            price: 0
        }
        this.handleChangeCoinId = this.handleChangeCoinId.bind(this)
        this.handleChangeDate = this.handleChangeDate.bind(this)
        this.handleChangeQuantity = this.handleChangeQuantity.bind(this)
        this.handleChangePrice = this.handleChangePrice.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChangeCoinId(evt){
        const coinId = Number(evt.target.value)
        this.setState({ coinId })
    }
    handleChangeDate(evt){
        const date = evt.target.value
        this.setState({ date })
    }
    handleChangeQuantity(evt){
        const quantity = Number(evt.target.value)
        this.setState({ quantity })
    }
    handleChangePrice(evt){
        const price = Number(evt.target.value)
        this.setState({ price })
    }
    handleSubmit(evt){
        evt.preventDefault();
        const newTransaction = {
            userId: this.state.userId,
            coinId: this.state.coinId,
            purchaseDate: Date.now(),
            purchaseQuantity: this.state.quantity,
            purchasePrice: this.state.price
        }
        this.props.postTransaction(newTransaction)
        // axios.post('/api/transactions', newTransaction)
        // .then(res=>res.data)
        // .catch(console.error)
        history.push('/home/transactions')
    }
    render(){
        console.log(this.state)
        const coins = this.props.coins
        const coinOptions = coins.map((coin, i)=>(
            <option key={i} value={coin.id}>{coin.name}</option>
        ))
        const selectOptions = (<div className='form-group'>
            <label htmlFor="selectCoin">Select Coin</label>
            <select value={this.state.coinId}
                    onChange={this.handleChangeCoinId}
                    className='selectpicker'
                    id="selectCoin">
                { coinOptions }
            </select>
        </div>)

        return(
            <div className="content">
            <div className="container-fluid">

              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="header">
                      <h4 className="title">Add a transaction</h4>
                      <p className="category">Please enter the transaction details below</p>
                    </div>

                    <div className="content">
                      <form onSubmit={this.handleSubmit}>

                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Date</label>
                                    <input type="text" className="form-control border-input" placeholder="Date" onChange={this.handleChangeDate} disabled />
                                </div>

                                <div className="form-group">
                                    { selectOptions }
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Quantity</label>
                                    <input type="text" className="form-control border-input" placeholder="Quantity" onChange={this.handleChangeQuantity} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Purchase Price</label>
                                    <input className="form-control border-input" placeholder="Purchase Price" onChange={this.handleChangePrice} />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <div className="text-center">
                                    <button type="submit" className="btn btn-info btn-fill btn-wd">Add Transaction</button>
                                </div>
                            </div>
                        </div>

                        <div className="clearfix"></div>
                      </form>
                    </div>

{/* THE DIVS FOR THE TOP ROW */}
                  </div>
                </div>
              </div>
            </div>
          </div>
            )
    }
}

const MapState = (state) => {
    return {
        coins: state.coins,
        user: state.user
    }
}

const MapDispatch = (dispatch) => {
    return {
        postTransaction: (transData) => {
            dispatch(addTransaction(transData))
        }
    }
}

export default connect(MapState, MapDispatch)(AddTransaction)
