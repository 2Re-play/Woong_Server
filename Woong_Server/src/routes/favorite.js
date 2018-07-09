const express = require('express')

const needAuth = require('middlewares/userCheck')
const favoriteCtrl = require('../controller/favoriteController')


const favorite = express.Router()

/* GET home page. */
favorite.post('/:item_id', needAuth, favoriteCtrl.postFavoriteItemContorller)
favorite.delete('/:item_id', needAuth, favoriteCtrl.deleteFavoriteItemContorller)
favorite.get('/', needAuth, favoriteCtrl.getFavoriteItemContorller)

module.exports = favorite
