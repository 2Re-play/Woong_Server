const Joi = require('joi')
const jwt = require('lib/token')

const cartmodel = require('../models/cartModel')
const dbConnection = require('../lib/dbConnection')
const configAll = require('../../src/configAll')
const { respondJson, respondOnError } = require('../lib/response')

// 장바구니 등록
exports.InsertCart = async (req, res) => {
  const connection = await dbConnection()
  const { user_token } = req.headers
  const { secretKey } = configAll.secretKey
  const { item_id } = req.params
  const decode_result = await jwt.decode(user_token, secretKey)
  console.log('decode_result', decode_result)
  let data = {}
  let user_id
  data = {
    item_id,
    user_id,
  }
  data.user_id = decode_result.user_id
  const item_id_validation = Joi.validate(item_id, Joi.number().required())
  const user_token_validation = Joi.validate(user_token, Joi.string().required())
  if (item_id_validation.error) {
    respondOnError(item_id_validation.error, res, 422)
    if (user_token_validation) {
      respondOnError(user_token_validation.error, res, 422)
    }
  }
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
  const connection = await dbConnection()
  const { user_token } = req.headers
  const { secretKey } = configAll.secretKey
  const { item_id } = req.params
  const decode_result = await jwt.decode(user_token, secretKey)
  console.log('decode_result', decode_result)
  let data = {}
  let user_id
  data = {
    item_id,
    user_id,
  }
  data.user_id = decode_result.user_id
  const item_id_validation = Joi.validate(item_id, Joi.number().required())
  const user_token_validation = Joi.validate(user_token, Joi.string().required())
  if (item_id_validation.error) {
    respondOnError(item_id_validation.error, res, 422)
    if (user_token_validation) {
      respondOnError(user_token_validation.error, res, 422)
    }
  }
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
  const connection = await dbConnection()
  const { user_token } = req.headers
  const { secretKey } = configAll.secretKey
  const decode_result = await jwt.decode(user_token, secretKey)
  console.log('decode_result', decode_result)
  let data = {}
  let cartlist
  let user_id
  data = {
    user_id,
  }
  data.user_id = decode_result.user_id
  const user_token_validation = Joi.validate(user_token, Joi.string().required())
  if (user_token_validation.error) {
    respondOnError(user_token_validation.error, res, 422)
  }
  try {
    cartlist = await cartmodel.getcart(connection, data)
    // for (let i = 0; i <= cartlist.length; i++) {
    //   if (cartlist[i].delivery === 1) {
    //     cartlist[i].delivery = 2500
    //   } else {
    //     cartlist[i].delivery = 0
    //   }
    // }
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
