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
