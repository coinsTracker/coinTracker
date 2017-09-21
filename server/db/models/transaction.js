const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Transaction = db.define('transaction', {
  purchaseQuantity:{
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  purchasePrice:{
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  purchaseDate:{
    type: Sequelize.DATE,
    allowNull: false
  }
})
module.exports = Transaction
