const Joi = require('joi')
const favoriteModel = require('models/favoriteModel')

const { respondJson, respondOnError } = require('lib/response')
const dbConnection = require('lib/dbConnection')

const postFavoriteItemContorller = async (req, res) => {
  const { item_id } = req.params
  const { user } = req
  // const { userToken } = req.headers
  const validation = Joi.validate(item_id, Joi.number().required())
  
  if (validation.error) {
    respondOnError(validation.error, res, 422)
  }

  const connection = await dbConnection()
  try {
    let favorite = [];
    [favorite] = await favoriteModel.selectCountByFavorite(connection, user, item_id)
    if (favorite.count === 0) await favoriteModel.insertFavoriteByUser(connection, user, item_id)
    else throw new Error('DUPLICATE ITEM FAVORITE')
    
    respondJson('post favorite succes', {}, res, 200)
  } catch (e) {
    console.log(e)
    respondOnError(e.message, res, 500)
  }
  connection.release()
}

const deleteFavoriteItemContorller = async (req, res) => {
  const { item_id } = req.params
  const { user } = req
  
  const validation = Joi.validate(item_id, Joi.number().required())
  
  if (validation.error) {
    throw new Error(validation.error)
  }

  const connection = await dbConnection()
  try {
    let favorite = [];
    [favorite] = await favoriteModel.selectCountByFavorite(connection, user, item_id)
    if (favorite.count > 0) await favoriteModel.deleteFavoriteByUser(connection, user, item_id)
    else throw new Error('Doesn\'t Delete Anything')
    
    respondJson('delete favorite success', {}, res, 200)
  } catch (e) {
    console.log(e)
    respondOnError(e.message, res, 500)
  }
  connection.release()
}

const getFavoriteItemContorller = async (req, res) => {
  const { user } = req
  const { main_id } = req.params

  const validation = Joi.validate(main_id, Joi.number().required())
  
  if (validation.error) {
    throw new Error(validation.error)
  }

  const connection = await dbConnection()
  try {
    let favorite_info = [];
    [favorite_info] = await favoriteModel.selectFavoriteByUser(connection, user)
    const data = {
      favorite_info,
    }
    respondJson('get favorite success', data, res, 200)
  } catch (e) {
    console.log(e)
    respondOnError(e.message, res, 500)
  }
  connection.release()
}

module.exports = {
  getFavoriteItemContorller,
  postFavoriteItemContorller,
  deleteFavoriteItemContorller,
}
