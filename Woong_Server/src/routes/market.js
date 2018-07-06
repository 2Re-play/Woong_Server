const express = require('express')
const marketctrl = require('controller/marketController')

const Market = express.Router()

/* GET home page. */
Market.get('/info/:market_id', marketctrl.IntroMarket)

module.exports = Market
