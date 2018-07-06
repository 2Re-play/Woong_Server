const express = require('express')
const food_type = require('./food_type')
const weeklyfarmer = require('./weeklyFarmer')
const review = require('./review')

const router = express.Router()

/* GET home page. */
router.use('/food_type', food_type)
router.use('/weeklyfarmer', weeklyfarmer)
router.use('/review', review)

module.exports = router
