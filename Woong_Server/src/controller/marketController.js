const Joi = require('joi')
const marketmodel = require('../models/marketModel')
const dbConnection = require('../lib/dbConnection')
const distance = require('../lib/distance')
const { respondJson, respondOnError } = require('../lib/response')
 
// 판매자 마켓 소개
exports.IntroMarket = async (req, res) => {
  const connection = await dbConnection()
  const { market_id } = req.params
  let data = {}
  let market_introduce
  data = {
    market_id,
  }
  const market_id_validation = Joi.validate(market_id, Joi.number().required())
  if (market_id_validation.error) {
    respondOnError(market_id_validation.error, res, 422)
  }
  try {
    [market_introduce] = await marketmodel.introduce(connection, data)
    const result = {
      market_introduce,
    }
    respondJson('successfully get market introduce data', result, res, 200)
  } catch (e) {
    console.log(e)
    respondOnError(e.message, res, 500)
  } finally {
    connection.release()
  }
}
// 판매자 특정상품 정보 보기
exports.ItemDetail = async (req, res) => {
  const connection = await dbConnection()
  const { market_id, item_id } = req.params
  let data = {}
  let itemdetail
  data = {
    market_id,
    item_id,
  }
  const market_id_validation = Joi.validate(market_id, Joi.number().required())
  const item_id_validation = Joi.validate(item_id, Joi.number().required())
  if (market_id_validation.error || item_id_validation.error) {
    respondOnError(market_id_validation.error, res, 422)
    if (item_id_validation.error) {
      respondOnError(item_id_validation, res, 422) 
    }
  } 
  try {
    [itemdetail] = await marketmodel.itemdetail(connection, data)
    const result = {
      itemdetail,
    }
    respondJson('successfully get item detail data', result, res, 200)
  } catch (e) {
    console.log(e)
    respondOnError(e.message, res, 500)
  } finally {
    connection.release()
  }
}
// 판매자 마켓 물품 리스트<이름순,인기순>
exports.Itemsorting = async (req, res) => {
  const connection = await dbConnection()
  const { market_id } = req.params
  const { option } = req.query
  let data = {}
  let item_sort
  data = {
    option,
    market_id,
  }
  const query_validation = Joi.validate(option, Joi.string().required())
  const market_id_validation = Joi.validate(market_id, Joi.number().required())
  if (market_id_validation.error) {
    respondOnError(market_id_validation.error, res, 422) 
  } if (query_validation.error) {
    respondOnError(query_validation.error, res, 422) 
  }
  try {
    item_sort = await marketmodel.itemsorting(connection, data)
    const result = {
      item_sort,
    }
    respondJson('successfully get sorting item data', result, res, 200)
  } catch (e) {
    console.log(e)
    respondOnError(e.message, res, 500)
  } finally {
    connection.release()
  }
}
