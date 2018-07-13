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
    const temp = await dista.getdistance(ulomo[0].user_latitude, ulomo[0].user_longitude, ulomo[0].market_latitude, ulomo[0].market_longitude)
    market_introduce[0].title_image_key = title_image_url
    market_introduce[0].farmer_image_key = farmer_image_url
    market_introduce[0].youandi = temp
    respondJson('successfully get market introduce data', market_introduce[0], res, 200)
  } catch (e) {
    console.log(e)
    respondOnError(e.message, res, 500)
  } finally {
    connection.release()
  }
}
// 북마크 플래그
exports.bookmarkfalg = async (req, res) => {
  const { user } = req
  const { market_id } = req.params
  let data = {}
  let user_id
  let flag
  data = {
    user_id,
    market_id,
  }
  data.user_id = user.user_id 
  const market_id_validation = Joi.validate(market_id, Joi.number().required())
  if (market_id_validation.error) {
    respondOnError(market_id_validation.error, res, 422)
  }
  const connection = await dbConnection()
  try {
    [flag] = await marketmodel.bookmarkflag(connection, data)
    console.log(flag)
    if (!flag) {
      respondJson('0', {}, res, 200)
    } else {
      respondJson('1', flag, res, 200)
    }
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
  let name_sort
  let best_sort
  data = {
    option,
    market_id,
  }
  const sheme = {
    option: Joi.string().required(),
    market_id: Joi.number().required(),
  }
  const validation = Joi.validate(data, sheme)
  if (validation.error) {
    throw new Error(validation.error)
  }
  const connection = await dbConnection()
  try {
    name_sort = await marketmodel.itemsorting1(connection, data)
    best_sort = await marketmodel.itemsorting2(connection, data)
    if (option === 'name') {
      for (let i = 0; i < name_sort.length; i++) {
        const temp = await signedUrl.getSignedUrl(name_sort[i].file_key)
        name_sort[i].file_key = temp
      } 
      respondJson('successfully get sorting item data', name_sort, res, 200)
    } else if (option === 'best') {
      for (let i = 0; i < best_sort.length; i++) {
        const temp = await signedUrl.getSignedUrl(best_sort[i].file_key)
        best_sort[i].file_key = temp
      } 
      respondJson('successfully get sorting item data', best_sort, res, 200)
    } else {
      respondJson('잘못된 쿼리스트링!! 쿼리스트링은 name과 best만 존재합니다.', {}, res, 203)
    } 
  } catch (e) {
    console.log(e)
    respondOnError(e.message, res, 500)
  } finally {
    connection.release()
  }
}
