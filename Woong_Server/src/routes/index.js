const express = require('express')
const category = require('./category')
const cart = require('./cart')
const weeklyfarmer = require('./weeklyFarmer')
const review = require('./review')
const bookmark = require('./bookmark')
const item = require('./item')
const favorite = require('./favorite')

const router = express.Router()

/* GET home page. */
router.use('/category', category)
router.use('/cart', cart)
router.use('/weeklyfarmer', weeklyfarmer) 
router.use('/review', review)
router.use('/item', item)
router.use('/bookmark', bookmark)
router.use('/favorite', favorite)

module.exports = router
