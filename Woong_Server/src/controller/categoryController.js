const Joi = require('joi')
const _ = require('lodash')


const categoryModel = require('models/categoryModel')
const { respondJson, respondOnError } = require('lib/response')
const dbConnection = require('lib/dbConnection')

const signedUrl = require('../lib/signedurl')

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
  let data = req.params
  const { user } = req

  const sheme = {
    main_id: Joi.number().required(),
    sub_id: Joi.number().required(),
  }

  const validation = Joi.validate(data, sheme)

  if (validation.error) {
    throw new Error(validation.error)
  }

  const connection = await dbConnection()
  try {
    const item_info = await categoryModel.selectItemByMarket(connection, data, user)
    for (const i in item_info) {
      item_info[i].file_key = await signedUrl.getSignedUrl(item_info[i].file_key)
      console.log(item_info[i].file_key)
    }
    data = {
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
