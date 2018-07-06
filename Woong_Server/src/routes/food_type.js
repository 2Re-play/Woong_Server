const express = require('express')
const foodctrl = require('../controller/foodTypeController')

const footType = express.Router()

/* GET home page. */
footType.get('/:food_type_idx', foodctrl.selectTypeFromFood)

module.exports = footType
