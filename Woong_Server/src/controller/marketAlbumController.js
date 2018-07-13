const dbConnection = require('lib/dbConnection')
const marketData = require('../models/marketModel')
const signedurl = require('../lib/signedurl')
const Joi = require('joi')
const { respondJson, respondOnError } = require('lib/response')

// 1. 마켓 앨범 가져오기 
exports.getMarketAlbum = async (req, res) => {
  const connection = await dbConnection()
  let getMarketAlbumResult 
  const { market_id } = req.params
  let data = {}
  data = {
    market_id,
  }

  const validation = Joi.validate(market_id, Joi.number().required())

  if (validation.error) {
    respondOnError(validation.error, res, 422)
  }

  try {
    getMarketAlbumResult = await marketData.getAlbum(connection, data)

    for (let i in getMarketAlbumResult) {
      console.log(await signedurl.getSignedUrl(getMarketAlbumResult[i].file_key))
      getMarketAlbumResult[i].file_key = await signedurl.getSignedUrl(getMarketAlbumResult[i].file_key)
    }

    respondJson('success', getMarketAlbumResult, res, 200)

  } catch (e) {
    console.log(e)
    respondOnError(e.message, res, 500)
  } finally {
    connection.release()
  }
}
