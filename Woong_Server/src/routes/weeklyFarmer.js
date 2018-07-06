const express = require('express')
const weeklyFarmerCtrl = require('../controller/weeklyFarmerController')

const weeklyFarmer = express.Router()

// 이주의 농부
weeklyFarmer.get('/', weeklyFarmerCtrl.getWeeklyFarmer)
module.exports = weeklyFarmer
