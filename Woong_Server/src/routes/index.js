const express = require('express')
const cart = require('./cart')

const router = express.Router()

/* GET home page. */
router.use('/cart', cart)

module.exports = router
