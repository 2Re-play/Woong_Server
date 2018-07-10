const express = require('express')
const itemCtrl = require('controller/itemController')
const needAuth = require('middlewares/userCheck')

const item = express.Router()

item.get('/search', needAuth, itemCtrl.getItemSearchController)

module.exports = item
