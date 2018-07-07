const express = require('express')
const favoriteCtrl = require('controller/favoriteController')
const needAuth = require('middlewares/userCheck')

const favorite = express.Router()

/* GET home page. */
favorite.post('/:item_id', favoriteCtrl.postFavoriteItemContorller)
favorite.delete('/:item_id', favoriteCtrl.deleteFavoriteItemContorller)
favorite.get('/', favoriteCtrl.getFavoriteItemContorller)

module.exports = favorite
