// 북마크 리스트/등록/해제 Controller

// const Joi = require('joi')

const { respondJson, respondOnError } = require('lib/response')
const dbConnection = require('lib/dbConnection')
const bookmarkData = require('../models/bookmarkModel')

// 1. 북마크 리스트  
exports.getBookmark = async (req, res) => {
  const connection = await dbConnection()
  let bookmarkResult
  const { user_token } = req.headers // 토큰
  let data = {}
  data = {
    user_token,
  }
  try {
    bookmarkResult = await bookmarkData.getBookmark(connection, data)
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
  let data = {}
  data = {
    user_token,
    market_id,
  }

  const connection = await dbConnection()
  try {
    let bookmark = [];
    [bookmark] = await bookmarkData.selectCountByBookmark(connection, data)
    if (bookmark.count === 0) await bookmarkData.addBookmark(connection, data)
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
  let data = {}
  data = {
    market_id,
  }
  try {
    let bookmark = [];
    [bookmark] = await bookmarkData.selectCountByBookmark(connection, data)
    if (bookmark.count > 0) await bookmarkData.deleteBookmark(connection, data)
    else throw new Error('you already deleted')

    respondJson('success delete bookmark', {}, res, 200)
  } catch (e) {
    console.log(e)
    respondOnError(e.message, res, 500)
  } finally {
    connection.release()
  }
}
