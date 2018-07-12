const Joi = require('joi')
const itemModel = require('models/itemModel')
const { respondJson, respondOnError } = require('lib/response')
const dbConnection = require('lib/dbConnection')
const signedUrl = require('../lib/signedurl')

const getItemSearchController = async (req, res) => {
  const { keyword } = req.query
  const { user } = req

//  const validation = Joi.validate(keyword, Joi.string().regex(/^[ㄱ-ㅎ|가-힣\*]+$/).required())
  
//  if (validation.error) {
//    respondOnError(validation.error, res, 422)
//  }

  const connection = await dbConnection()
  try {
    const item_info = await itemModel.selectItemByKeyword(connection, user, keyword)
    for (const i in item_info) {
      item_info[i].file_key = await signedUrl.getSignedUrl(item_info[i].file_key)
      console.log(item_info[i].file_key)
    }
    const data = {
      item_info,
    }
    respondJson('get favorite success', data, res, 200)
  } catch (e) {
    console.log(e)
    respondOnError(e.message, res, 500)
  }
  connection.release()
}

module.exports = {
  getItemSearchController,
}
