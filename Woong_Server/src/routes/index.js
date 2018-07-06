const express = require('express')
const food_type = require('routes/food_type')
const account = require('routes/account')


const router = express.Router()

/* GET home page. */
router.use('/food_type', food_type)
router.use('/account', account)
console.log('index')

module.exports = router
