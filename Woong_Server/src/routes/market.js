const express = require('express')
const marketAlbumCtrl = require('../controller/marketAlbumController')
const reviewCtrl = require('../controller/reviewController')

const market = express.Router()

market.get('/:market_id/album', marketAlbumCtrl.getMarketAlbum)
market.get('/:market_id/review', reviewCtrl.getReview)

module.exports = market
