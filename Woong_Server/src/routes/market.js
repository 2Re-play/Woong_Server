const express = require('express')
const marketctrl = require('controller/marketController')
const marketAlbumCtrl = require('../controller/marketAlbumController')
const reviewCtrl = require('../controller/reviewController')

const Market = express.Router()

Market.get('/info/:market_id', marketctrl.IntroMarket)
Market.get('/:market_id/item/:item_id', marketctrl.ItemDetail)
Market.get('/:market_id', marketctrl.Itemsorting)
Market.get('/:market_id/album', marketAlbumCtrl.getMarketAlbum)
Market.get('/:market_id/review', reviewCtrl.getReview)

module.exports = Market
