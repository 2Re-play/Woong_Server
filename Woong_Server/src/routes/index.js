const express = require('express')
const category = require('./category')
const cart = require('./cart')
const food_type = require('./food_type')
const weeklyfarmer = require('./weeklyFarmer') // 이 주의 농부 
const review = require('./review') // 리뷰
const bookmark = require('./bookmark') // 즐겨찾기

const router = express.Router()

/* GET home page. */
router.use('/category', category)
router.use('/cart', cart)
router.use('/food_type', food_type)
router.use('/weeklyfarmer', weeklyfarmer) 
router.use('/review', review)
router.use('/bookmark', bookmark)


module.exports = router