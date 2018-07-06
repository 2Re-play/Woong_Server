const express = require('express')
const food_type = require('./food_type')
const weeklyfarmer = require('./weeklyFarmer')

const router = express.Router()

/* GET home page. */
router.use('/food_type', food_type)
router.use('/weeklyfarmer', weeklyfarmer)

module.exports = router
