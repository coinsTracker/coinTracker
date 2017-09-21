const router = require('express').Router()
const {Transaction} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Transaction.findAll({
    include:[{all:true, nested:true}]
  })
  .then(transactions => res.json(transactions))
  .catch(next)
})
