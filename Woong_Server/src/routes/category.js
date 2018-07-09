const express = require('express')
const categoryCtrl = require('controller/categoryController')
const needAuth = require('middlewares/userCheck')

const category = express.Router()

/* GET home page. */
category.get('/main/:main_id', categoryCtrl.getSubCategoryListController)
category.get('/main/:main_id/sub/:sub_id', needAuth, categoryCtrl.getItemListController)

module.exports = category
