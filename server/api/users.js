const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    // attributes: ['name', 'id', 'email'],
    include:[{all:true, nested:true}]
  })
    .then(users => res.json(users))
    .catch(next)
})

router.get('/:userId', (req, res, next) => {
  User.findOne({
    where:{
      id: req.params.userId
    },
    include:[{all:true, nested:true}]
  })
    .then(user => res.json(user))
    .catch(next)
})
