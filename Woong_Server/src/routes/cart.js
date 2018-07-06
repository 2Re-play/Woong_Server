const express = require('express')
const cartctrl = require('../controller/cartController')

const Cart = express.Router()

/* GET home page. */
Cart.post('/:item_idx', cartctrl.InsertCart)

module.exports = Cart
