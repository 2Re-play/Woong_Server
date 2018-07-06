const express = require('express')
const categoryCtrl = require('controller/categoryController')

const category = express.Router()

/* GET home page. */
category.get('/main/:main_id', categoryCtrl.getSubCategoryListController)

module.exports = category
