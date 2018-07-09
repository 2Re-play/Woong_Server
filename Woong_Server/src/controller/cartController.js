const Joi = require('joi')

const cartmodel = require('../models/cartModel')
const dbConnection = require('../lib/dbConnection')
const { respondJson, respondOnError } = require('../lib/response')
const signedUrl = require('../lib/signedurl')

// 장바구니 등록
exports.InsertCart = async (req, res) => {
  const { user } = req
  const { item_id } = req.params
  let data = {}
  let user_id
  data = {
    item_id,
    user_id,
  }
  data.user_id = user.user_id
  const item_id_validation = Joi.validate(item_id, Joi.number().required())
  if (item_id_validation.error) {
    respondOnError(item_id_validation.error, res, 422)
  }
  const connection = await dbConnection()
  try {
    cartmodel.postcart(connection, data)
    respondJson('successfully Insert cart data', {}, res, 200) 
  } catch (e) {
    console.log(e)
    respondOnError(e.message, res, 500)
  } finally {
    connection.release()
  }
}
// 장바구니  해제 
exports.deleteCart = async (req, res) => {
  const { user } = req
  const { item_id } = req.params
  let data = {}
  let user_id
  data = {
    item_id,
    user_id,
  }
  data.user_id = user.user_id
  const item_id_validation = Joi.validate(item_id, Joi.number().required())
  if (item_id_validation.error) {
    respondOnError(item_id_validation.error, res, 422)
  }
  const connection = await dbConnection()
  try {
    cartmodel.deletecart(connection, data)
    respondJson('successfully delete cart data', {}, res, 200) 
  } catch (e) {
    console.log(e)
    respondOnError(e.message, res, 500)
  } finally {
    connection.release()
  }
}
// 장바구니 목록
exports.getCart = async (req, res) => {
  // const { user } = req
  const { user } = req
  let data = {}
  let cartlist
  let user_id
  data = {
    user_id,
  }
  data.user_id = user.user_id
  const connection = await dbConnection()
  try {
    cartlist = await cartmodel.getcart(connection, data)
    for (let i = 0; i < cartlist.length; i++) {
      cartlist[i].file_key = await signedUrl.getSignedUrl(cartlist[i].file_key)
    }
    for (let i = 0; i < cartlist.length; i++) {
      if (cartlist[i].delivery === 1) {
        cartlist[i].delivery = 2500
      } else {
        cartlist[i].delivery = 0
      }
    }
    const result = {
      cartlist,
    }
    respondJson('successfully get cart data', result, res, 200) 
  } catch (e) {
    console.log(e)
    respondOnError(e.message, res, 500)
  } finally {
    connection.release()
  }
}
