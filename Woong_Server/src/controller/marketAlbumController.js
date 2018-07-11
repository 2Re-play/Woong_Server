const dbConnection = require('lib/dbConnection')
const marketData = require('../models/marketModel')
const signedurl = require('../lib/signedurl')

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

    for (let i in getMarketAlbumResult) {
      console.log(await signedurl.getSignedUrl(getMarketAlbumResult[i].file_key))
      getMarketAlbumResult[i].file_key = await signedurl.getSignedUrl(getMarketAlbumResult[i].file_key)
    }

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
