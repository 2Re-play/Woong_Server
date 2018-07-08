const express = require('express')
const marketctrl = require('controller/marketController')

const Market = express.Router()

Market.get('/info/:market_id', marketctrl.IntroMarket)
Market.get('/:market_id/item/:item_id', marketctrl.ItemDetail)
Market.get('/:market_id', marketctrl.Itemsorting)
module.exports = Market
