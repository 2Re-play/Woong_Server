const express = require('express')
const food_type = require('./food_type')

const router = express.Router()

/* GET home page. */
router.use('/food_type', food_type)

module.exports = router
