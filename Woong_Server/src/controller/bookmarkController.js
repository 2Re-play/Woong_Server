const dbConnection = require('lib/dbConnection')
const bookmarkData = require('../models/bookmarkModel')

// 1. 북마크 리스트  
exports.getBookmark = async (req, res) => {
  const connection = await dbConnection()
  let bookmarkResult
  const { user_id } = req.headers // 토큰
  let data = {}
  data = {
    user_id,
  }
  try {
    bookmarkResult = await bookmarkData.getBookmark(connection, data)

    res.status(200).send({
      message: 'success',
      data: bookmarkResult,
    })
  } catch (e) {
    console.log(e)
    res.status(500).send({
      message: 'Internal Server Error',
    })
  } finally {
    connection.release()
  }
}

// 2. 북마크 추가
exports.addBookmark = async (req, res) => {
  const connection = await dbConnection()
  const { user_token } = req.headers
  const { market_id } = req.params
  let data = {}
  data = {
    user_token,
    market_id,
  }
  try {
    bookmarkData.addBookmark(connection, data)
    res.status(200).send({
      message: 'success add Bookmark',
    })
  } catch (e) {
    console.log(e)
    res.status(500).send({
      message: 'Internal Server Error',
    })
  } finally {
    connection.release()
  }

}

// 3. 북마크 제거
exports.deleteBookmark = async (req, res) => {
  const connection = await dbConnection()
  const { market_id } = req.params
  let data = {}
  data = {
    market_id,
  }
  try {
    bookmarkData.deleteBookmark(connection, data)
    res.status(200).send({
      message: 'success delete Bookmark',
    })
  } catch (e) {
    console.log(e)
    res.status(500).send({
      message: 'Internal Server Error',
    })
  } finally {
    connection.release()
  }
}
