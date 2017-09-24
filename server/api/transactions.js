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

router.post('/', (req, res, next) => {
  Transaction.create(req.body)
  .then(transactions => res.json(transactions))
  .catch(next)
})

router.get('/:userId', (req, res, next) => {
  Transaction.findAll({
    where:{userId: req.params.userId},
    include:[{all:true, nested:true}]
  })
  .then(transactions => res.json(transactions))
  .catch(next)
})
