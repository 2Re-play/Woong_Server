const express = require('express')
const category = require('./category')
const cart = require('./cart')

const router = express.Router()

/* GET home page. */
router.use('/category', category)
router.use('/cart', cart)

module.exports = router
