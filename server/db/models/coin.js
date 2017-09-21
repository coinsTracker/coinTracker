const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Coin = db.define('coin', {
  symbol:{
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  name:{
    type: Sequelize.STRING,
    allowNull: false
  },
  icon:{
    type: Sequelize.STRING
  },
  currentPrice:{
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  currentSupply:{
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  currentVolume:{
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  currentMarketCap:{
    type: Sequelize.DOUBLE,
    allowNull: false
  }
})
module.exports = Coin
