const Joi = require('joi')
const categoryModel = require('models/categoryModel')

const dbConnection = require('../../lib/dbConnection')

const getSubCategoryListController = async (req, res) => {
  const { main_id } = req.params
  
  // const data = _.cloneDeep(body)
  const validation = Joi.validate(main_id, Joi.number().required())
  
  if (validation.error) {
    return
  }

  const connection = await dbConnection()
  console.log(connection)
  try {
    const category_info = await categoryModel.selectSubListByMain(connection, main_id)
  } catch (e) {

  }
  res.send('ok')
}


module.exports = {
  getSubCategoryListController,
}
