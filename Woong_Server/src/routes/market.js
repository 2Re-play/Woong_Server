const express = require('express')
const marketctrl = require('controller/marketController')
const userCheck = require('../middlewares/userCheck')

const Market = express.Router()

Market.get('/distance', userCheck, marketctrl.distance)
Market.get('/info/:market_id', userCheck, marketctrl.IntroMarket)
Market.get('/:market_id/item/:item_id', marketctrl.ItemDetail)
Market.get('/:market_id', marketctrl.Itemsorting)


module.exports = Market
