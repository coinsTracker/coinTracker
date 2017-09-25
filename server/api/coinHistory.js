const router = require('express').Router()
const {CoinHistory} = require('../db/models')
module.exports = router

router.get('/:symbol', (req, res, next) => {
  CoinHistory.findAll({
    where: {symbol: req.params.symbol},
    order: [['time', 'ASC']]
  })
    .then(coins => res.json(coins))
    .catch(next)
})
