const router = require('express').Router()
const {Coin} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Coin.findAll({
    include:[{all:true, nested:true}],
    order: [['currentMarketCap', 'DESC']]
  })
    .then(coins => res.json(coins))
    .catch(next)
})

//NEEDED FOR THE ALL COIN HISTORY FETCH
router.get('/:symbol', (req, res, next) => {
  Coin.findOne({
    where:{ symbol: req.params.symbol }
  })
    .then(coins => res.json(coins))
    .catch(next)
})
