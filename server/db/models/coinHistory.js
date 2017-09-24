const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const CoinHistory = db.define('coinHistory', {
  symbol:{
    type: Sequelize.STRING,
    allowNull: false
  },
  time:{
    type: Sequelize.DATE,
    allowNull: false
  },
  price:{
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  marketCap:{
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  volume:{
    type: Sequelize.DOUBLE,
    allowNull: false
  }
})
module.exports = CoinHistory
