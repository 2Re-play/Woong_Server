const express = require('express')
const foodctrl = require('controller/foodTypeController')

const footType = express.Router()

/* GET home page. */
footType.get('/', foodctrl.selectTypeFromFood)
console.log('food_type')

module.exports = footType
