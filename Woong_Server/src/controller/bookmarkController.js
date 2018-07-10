// 북마크 리스트/등록/해제 Controller
const Joi = require('joi')
const jwt = require('lib/token')

const signedurl = require('../lib/signedurl')

const { respondJson, respondOnError } = require('lib/response')
const dbConnection = require('lib/dbConnection')
const configAll = require('../../src/configAll')
const bookmarkData = require('../models/bookmarkModel')

// 1. 북마크 리스트  
exports.getBookmark = async (req, res) => {
  const connection = await dbConnection()
  let bookmarkResult

  const { user_token } = req.headers // 토큰
  const { secretKey } = configAll.secretKey

  const decode_result = await jwt.decode(user_token, secretKey)
  console.log(decode_result)

  try {
    const user_id = await decode_result.user_id
    bookmarkResult = await bookmarkData.getBookmark(connection, user_id)
    bookmarkResult[0].title_image_key = await signedurl.getSignedUrl(bookmarkResult[0].title_image_key)
    console.log(bookmarkResult[0].title_image_key)
    // console.log('유저아이디: '+user_id)
    respondJson('success', bookmarkResult, res, 200)

  } catch (e) {

    respondOnError(e.message, res, 500)

  } finally {
    connection.release()
  }
}

// 2. 북마크 등록
exports.addBookmark = async (req, res) => {
  const { user_token } = req.headers
  const { market_id } = req.params
  const { secretKey } = configAll.secretKey

  const decode_result = await jwt.decode(user_token, secretKey)
  const user_id = await decode_result.user_id
  console.log(`USER_ID:${user_id}`)
  const connection = await dbConnection()
  const validation = Joi.validate(market_id, Joi.number().required())

  if (validation.error) {
    respondOnError(validation.error, res, 422)
  }

  try {
    let bookmark = [];
    [bookmark] = await bookmarkData.selectCountByBookmark(connection, market_id, user_id)
    if (bookmark.count === 0) await bookmarkData.addBookmark(connection, market_id, user_id)
    else throw new Error('duplicate market bookmark')

    respondJson('success add bookmark', {}, res, 200)
 
  } catch (e) {
    console.log('들어옴3')
    console.log(e)
    respondOnError(e.message, res, 500)
  
  } finally {
    connection.release()
  }

}

// 3. 북마크 해제
exports.deleteBookmark = async (req, res) => {
  const connection = await dbConnection()

  const { market_id } = req.params
  const { user_token } = req.headers
  const { secretKey } = configAll.secretKey


  const decode_result = await jwt.decode(user_token, secretKey)
  console.log(decode_result)
  const user_id = await decode_result.user_id

  const validation = Joi.validate(market_id, Joi.number().required())

  if (validation.error) {
    respondOnError(validation.error, res, 422)
  }

  try {
    let bookmark = [];
    [bookmark] = await bookmarkData.selectCountByBookmark(connection, user_id, market_id)
    if (bookmark.count > 0) await bookmarkData.deleteBookmark(connection, user_id, market_id)
    else throw new Error('you already deleted')

    respondJson('success delete bookmark', {}, res, 200)
  } catch (e) {
    console.log(e)
    respondOnError(e.message, res, 500)
  } finally {
    connection.release()
  }
}
