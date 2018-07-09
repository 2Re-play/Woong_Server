const express = require('express')
const cartctrl = require('controller/cartController')
const userCheck = require('../middlewares/userCheck')

const Cart = express.Router()

/* GET home page. */
Cart.post('/:item_id', userCheck, cartctrl.InsertCart)
Cart.delete('/:item_id', userCheck, cartctrl.deleteCart)
Cart.get('/', userCheck, cartctrl.getCart)

module.exports = Cart
