const express = require('express')
const category = require('./category')
const cart = require('./cart')
const weeklyfarmer = require('./weeklyFarmer') // 이 주의 농부 
const review = require('./review') // 리뷰
const bookmark = require('./bookmark') // 즐겨찾기
const market = require('./market')
const item = require('./item')
const favorite = require('./favorite')
const account = require('./account')
const chat = require('./chat')
const dummyImage = require('./image')

const router = express.Router()

/* GET home page. */
router.use('/category', category)
router.use('/cart', cart)
router.use('/weeklyfarmer', weeklyfarmer) 
router.use('/review', review)
router.use('/item', item)
router.use('/bookmark', bookmark)
router.use('/market', market)
router.use('/favorite', favorite)
router.use('/account', account)
router.use('/chat', chat)
router.use('/dummyImage', dummyImage)

module.exports = router
