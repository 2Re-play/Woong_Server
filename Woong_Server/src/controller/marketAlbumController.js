const dbConnection = require('lib/dbConnection')
const marketData = require('../models/marketModel')

// 1. 마켓 앨범 가져오기 
exports.getMarketAlbum = async (req, res) => {
  const connection = await dbConnection()
  let getMarketAlbumResult 
  const { market_id } = req.params
  let data = {}
  data = {
    market_id,
  }
  try {
    getMarketAlbumResult = await marketData.getAlbum(connection, data)

    res.status(200).send({
      message: 'success',
      data: getMarketAlbumResult,
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
