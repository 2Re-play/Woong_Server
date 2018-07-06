const dbConnection = require('lib/dbConnection')
const bookmarkData = require('../models/bookmarkModel')

exports.getBookmark = async (req, res) => {
  const connection = await dbConnection()
  let bookmarkResult
  const { user_token } = req.headers // 토큰
  try {
    bookmarkResult = await bookmarkData.getBookmark(connection)

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
