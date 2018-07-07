const Joi = require('joi')
const itemModel = require('models/itemModel')

const dbConnection = require('lib/dbConnection')

const getItemSearchController = async (req, res) => {
  const { keyword } = req.query

  const validation = Joi.validate(keyword, Joi.string().regex(/^[ㄱ-ㅎ|가-힣\*]+$/).required())
  
  if (validation.error) {
    throw new Error(validation.error)
  }

  const connection = await dbConnection()
  try {
    const item_info = await itemModel.selectItemByKeyword(connection, keyword)
    const data = {
      item_info,
    }
    res.status(200)
    res.send({ data })
  } catch (e) {
    console.log(e)
    res.status(500)
    res.send(e)
  }
  connection.release()
}

module.exports = {
  getItemSearchController,
}
