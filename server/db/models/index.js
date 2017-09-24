const User = require('./user')
const Coin = require('./coin')
const Transaction = require('./transaction')
const CoinHistory = require('./coinHistory')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Transaction.belongsTo(User)
User.hasMany(Transaction)

Transaction.belongsTo(Coin)
Coin.hasMany(Transaction)
// CoinHistory.belongsTo(Coin)
Coin.hasMany(CoinHistory)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

module.exports = {
  User,
  Coin,
  Transaction,
  CoinHistory
}
