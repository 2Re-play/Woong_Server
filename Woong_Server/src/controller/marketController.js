const Joi = require('joi')

const marketmodel = require('../models/marketModel')
const dbConnection = require('../lib/dbConnection')
const signedUrl = require('../lib/signedurl')
const dista = require('../lib/distance')

const { respondJson, respondOnError } = require('../lib/response')

exports.distance = async (req, res) => {
  const { user } = req
  let data = {}
  let user_id
  let location
  let marketform
  data = {
    user_id,
  }
  data.user_id = user.user_id 
  const connection = await dbConnection()
  try {
    location = await marketmodel.ulocation(connection, data)
    marketform = await marketmodel.marketform(connection)
    for (let i = 0; i < marketform.length; i++) {
      const temp = await dista.getdistance(location[i].user_latitude, location[i].user_longitude, location[i].market_latitude, location[i].market_longitude) // 유저 마켓 위도경도로 수정하기
      marketform[i].youandi = temp
    }
    console.log(marketform)
    for (let i = 0; i < marketform.length; i++) {
      const temp = await signedUrl.getSignedUrl(marketform[i].title_image_key)
      marketform[i].title_image_key = temp
    }
    respondJson('successfully get around market data', marketform, res, 200)
  } catch (e) {
    console.log(e)
    respondOnError(e.message, res, 500)
  } finally {
    connection.release()
  }
}
 
// 판매자 마켓 소개
exports.IntroMarket = async (req, res) => {
  const { user } = req 
  const { market_id } = req.params
  console.log(req.params)
  let data = {}
  let user_id
  let market_introduce
  let ulomo
  data = {
    market_id,
    user_id,
  }
  data.user_id = user.user_id 
  const market_id_validation = Joi.validate(market_id, Joi.number().required())
  if (market_id_validation.error) {
    respondOnError(market_id_validation.error, res, 422)
  }
  const connection = await dbConnection()
  try {
    market_introduce = await marketmodel.introduce(connection, data)
    ulomo = await marketmodel.ulomlo(connection, data)
    const title_image_url = await signedUrl.getSignedUrl(market_introduce[0].title_image_key)
    const farmer_image_url = await signedUrl.getSignedUrl(market_introduce[0].farmer_image_key)

    console.log('이미지 유알엘: '+ title_image_url+ '#######')

    const temp = await dista.getdistance(ulomo[0].user_latitude, ulomo[0].user_longitude, ulomo[0].market_latitude, ulomo[0].market_longitude)
    market_introduce[0].title_image_key = title_image_url
    market_introduce[0].farmer_image_key = farmer_image_url
    market_introduce[0].youandi = temp
    respondJson('successfully get market introduce data', market_introduce, res, 200)
  } catch (e) {
    console.log(e)
    respondOnError(e.message, res, 500)
  } finally {
    connection.release()
  }
}
// 판매자 특정상품 정보 보기
exports.ItemDetail = async (req, res) => {
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
  const connection = await dbConnection()
  try {
    [itemdetail] = await marketmodel.itemdetail(connection, data)
    console.log(itemdetail)
    const imageurl = await signedUrl.getSignedUrl(itemdetail.file_key)
    itemdetail.file_key = imageurl
    respondJson('successfully get item detail data', itemdetail, res, 200)
  } catch (e) {
    console.log(e)
    respondOnError(e.message, res, 500)
  } finally {
    connection.release()
  }
}
// 판매자 마켓 물품 리스트<이름순,인기순>
exports.Itemsorting = async (req, res) => {
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
  const connection = await dbConnection()
  try {
    item_sort = await marketmodel.itemsorting(connection, data)
    console.log(item_sort)
    for (let i = 0; i < item_sort.length; i++) {
      const temp = await signedUrl.getSignedUrl(item_sort[i].file_key)
      item_sort[i].file_key = temp
    }
    respondJson('successfully get sorting item data', item_sort, res, 200)
  } catch (e) {
    console.log(e)
    respondOnError(e.message, res, 500)
  } finally {
    connection.release()
  }
}
