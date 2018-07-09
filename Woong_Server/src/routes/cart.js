const express = require('express')
const cartctrl = require('controller/cartController')

const Cart = express.Router()

/* GET home page. */
Cart.post('/:item_id', cartctrl.InsertCart)
Cart.delete('/:item_id', cartctrl.deleteCart)

module.exports = Cart
