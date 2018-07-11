const Joi = require('joi')
const favoriteModel = require('models/favoriteModel')

const { respondJson, respondOnError } = require('lib/response')
const dbConnection = require('lib/dbConnection')

const postFavoriteItemContorller = async (req, res) => {
  const { item_id } = req.params
  const { user } = req
 
  const validation = Joi.validate(item_id, Joi.number().required())
  
  if (validation.error) {
    respondOnError(validation.error, res, 422)
    return
  }

  const connection = await dbConnection()
  try {
    let favorite = [];
    [favorite] = await favoriteModel.selectCountByFavorite(connection, user, item_id)
    if (favorite.count === 0) await favoriteModel.insertFavoriteByUser(connection, user, item_id)
    else throw new Error(409)
    // respondOnError('DUPLICATE FAVORITE ITEM', res, 409)
    
    respondJson('post favorite succes', {}, res, 200)
  } catch (e) {
    if (e.message === 409) respondOnError('Duplicate Error', res, e.message) 
    else respondOnError('SERVER ERROR', res, 500)
  }
  connection.release()
}

const deleteFavoriteItemContorller = async (req, res) => {
  const { item_id } = req.params
  const { user } = req
  
  const validation = Joi.validate(item_id, Joi.number().required())
  
  if (validation.error) {
    respondOnError(validation.error, res, 422)
    return
  }

  const connection = await dbConnection()
  try {
    let favorite = [];
    [favorite] = await favoriteModel.selectCountByFavorite(connection, user, item_id)
    if (favorite.count > 0) await favoriteModel.deleteFavoriteByUser(connection, user, item_id)
    else respondOnError('Doesn\'t Delete Anything', res, 204)
    
    respondJson('delete favorite success', {}, res, 200)
  } catch (e) {
    respondOnError(e.message, res, 500)
  }
  connection.release()
}

const getFavoriteItemContorller = async (req, res) => {
  const { user } = req

  const connection = await dbConnection()
  try {
    let favorite_info = [];
    [favorite_info] = await favoriteModel.selectFavoriteByUser(connection, user)
    if (favorite_info === undefined) respondOnError('Doesn\'t Data Anything', res, 204)
    

    const data = {
      favorite_info,
    }

    respondJson('get favorite success', data, res, 200)
  } catch (e) {
    respondOnError(e.message, res, 500)
  }
  connection.release()
}

module.exports = {
  getFavoriteItemContorller,
  postFavoriteItemContorller,
  deleteFavoriteItemContorller,
}
