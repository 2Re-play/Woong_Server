const Joi = require('joi')

const marketmodel = require('../models/marketModel')
const dbConnection = require('../lib/dbConnection')
const signedUrl = require('../lib/signedurl')
const dista = require('../lib/distance')

const { respondJson, respondOnError } = require('../lib/response')
 
// 판매자 마켓 소개
exports.IntroMarket = async (req, res) => {
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
  const connection = await dbConnection()
  try {
    [market_introduce] = await marketmodel.introduce(connection, data)
    const title_image_url = await signedUrl.getSignedUrl(market_introduce.title_image_key)
    const farmer_image_url = await signedUrl.getSignedUrl(market_introduce.farmer_image_key)
    console.log(market_introduce)
    console.log(1, title_image_url)
    market_introduce.title_image_key = title_image_url
    market_introduce.farmer_image_key = farmer_image_url
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
    const imageurl = await signedUrl.getSignedUrl(itemdetail.file_key)
    itemdetail.file_key = imageurl
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

exports.distance = async (req, res) => {
    
  const { user } = req
  let data = {}
  let distance
  data = {
    user_id,
  }
  data.user_id = user.user_id 
  const connection = await dbConnection()
  try {
    distance = await marketmodel.itemsorting(connection, data)
    for (let i = 0; i < distance.length; i++) {
      const temp = await dista.getdistance(distance.userLatitude, distance.userLongitude, distacne.lat2, distance.lon2) // 유저 마켓 위도경도로 수정하기
      distance[i].youandi = temp
    }
    const result = {
      distance,
    }
    respondJson('successfully get sorting item data', result, res, 200)
  } catch (e) {
    console.log(e)
    respondOnError(e.message, res, 500)
  } finally {
    connection.release()
  }
}
