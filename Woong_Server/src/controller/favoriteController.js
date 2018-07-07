const Joi = require('joi')
const favoriteModel = require('models/favoriteModel')

const dbConnection = require('lib/dbConnection')

const postFavoriteItemContorller = async (req, res) => {
  const { item_id } = req.params
  // const { userToken } = req.headers
  const validation = Joi.validate(item_id, Joi.number().required())
  
  if (validation.error) {
    throw new Error(validation.error)
  }

  const connection = await dbConnection()
  const user_id = 1 // remove
  try {
    let favorite = [];
    [favorite] = await favoriteModel.selectCountByFavorite(connection, user_id, item_id)
    if (favorite.count === 0) await favoriteModel.insertFavoriteByUser(connection, 1, 1)
    else throw new Error('DUPLICATE ITEM FAVORITE')
    const data = {
      result: 'ok',
    }
    res.status(200)
    res.send({ data })
  } catch (e) {
    console.log(e)
    res.status(500)
    res.send(e.message)
  }
  connection.release()
}

const deleteFavoriteItemContorller = async (req, res) => {
  const { item_id } = req.params
  // const { userToken } = req.headers
  const user_id = 1 // remove
  const validation = Joi.validate(item_id, Joi.number().required())
  
  if (validation.error) {
    throw new Error(validation.error)
  }

  const connection = await dbConnection()
  try {
    let favorite = [];
    [favorite] = await favoriteModel.selectCountByFavorite(connection, user_id, item_id)
    if (favorite.count > 0) await favoriteModel.deleteFavoriteByUser(connection, user_id, item_id)
    
    const data = {
      result: 'ok',
    }
    res.status(200)
    res.send({ data })
  } catch (e) {
    console.log(e)
    res.status(500)
    res.send(e)
  }
  connection.release()
}

const getFavoriteItemContorller = async (req, res) => {
  // const { userToken } = req.headers
  
  // const validation = Joi.validate(main_id, Joi.number().required())
  
  // if (validation.error) {
  //   throw new Error(validation.error)
  // }
  const user_id = 1 // remove
  const connection = await dbConnection()
  try {
    let favorite_info = [];
    [favorite_info] = await favoriteModel.selectFavoriteByUser(connection, user_id)
    const data = {
      favorite_info,
    }
    res.status(200)
    res.send({ data })
  } catch (e) {
    res.status(500)
    res.send(e)
  }
  connection.release()
}

module.exports = {
  getFavoriteItemContorller,
  postFavoriteItemContorller,
  deleteFavoriteItemContorller,
}
