const Joi = require('joi')
const categoryModel = require('models/categoryModel')
const { respondJson, respondOnError } = require('lib/response')
const dbConnection = require('lib/dbConnection')

const getSubCategoryListController = async (req, res) => {
  const { main_id } = req.params
  
  const validation = Joi.validate(main_id, Joi.number().required())
  
  if (validation.error) {
    respondOnError(validation.error, res, 422)
  }

  const connection = await dbConnection()
  try {
    const category_info = await categoryModel.selectSubListByMain(connection, main_id)
    const data = {
      category_info,
    }
    respondJson('get favorite success', data, res, 200)
  } catch (e) {
    console.log(e)
    respondOnError(e.message, res, 500)
  }
  connection.release()
}

const getItemListController = async (req, res) => {
  const { main_id, sub_id } = req.params

  let validation = Joi.validate(main_id, Joi.number().required())
  validation = Joi.validate(sub_id, Joi.number().required())

  if (validation.error) {
    throw new Error(validation.error)
  }

  const connection = await dbConnection()
  try {
    const item_info = await categoryModel.selectItemByMarket(connection, main_id, sub_id)
    console.log(item_info)
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
  getSubCategoryListController,
  getItemListController,
}
