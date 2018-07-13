// 북마크 리스트/등록/해제 Controller
const Joi = require('joi')

const { respondJson, respondOnError } = require('lib/response')
const dbConnection = require('lib/dbConnection')
const signedurl = require('../lib/signedurl')
const bookmarkData = require('../models/bookmarkModel')

// 1. 북마크 리스트  
exports.getBookmark = async (req, res) => {
  const connection = await dbConnection()
  let bookmarkResult

  const { user_id } = req.user // 토큰

  try {
    bookmarkResult = await bookmarkData.getBookmark(connection, user_id)
    for (const i in bookmarkResult) {
      console.log(await signedurl.getSignedUrl(bookmarkResult[i].title_image_key))
      bookmarkResult[i].title_image_key = await signedurl.getSignedUrl(bookmarkResult[i].title_image_key)
    }
  
    respondJson('success', bookmarkResult, res, 200)

  } catch (e) {
    console.log(e)
    respondOnError(e.message, res, 500)

  } finally {
    connection.release()
  }
}

// 2. 북마크 등록
exports.addBookmark = async (req, res) => {
  const { user_id } = req.user
  const { market_id } = req.params

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
  const { user_id } = req.user

  const validation = Joi.validate(market_id, Joi.number().required())

  if (validation.error) {
    respondOnError(validation.error, res, 422)
  }

  try {
    let bookmark = [];
    [bookmark] = await bookmarkData.selectCountByBookmark(connection, market_id, user_id)
    if (bookmark.count > 0) await bookmarkData.deleteBookmark(connection, market_id, user_id)
    else throw new Error('you already deleted')

    respondJson('success delete bookmark', {}, res, 200)
  } catch (e) {
    console.log(e)
    respondOnError(e.message, res, 500)
  } finally {
    connection.release()
  }
}
