const dbConnection = require('lib/dbConnection')
const historyModel = require('models/historyModel')
const Joi = require('joi')
const { respondJson, respondOnError } = require('../lib/response')


const post_location_history = async (req, res) => {

  const connection = await dbConnection()  
  const { user_id } = req.user
  const { history_name } = req.body
  

  console.log(req.body)
  console.log(user_id)
  console.log(history_name)


  const sheme = {
    user_id: Joi.number().required(),
    history_name: Joi.string().required(),
  }

  const validation_data = {
    user_id,
    history_name,
  }
  
  try {

    const input_validation = Joi.validate(validation_data, sheme)

    if (input_validation.error) {
      throw new Error(403)
    }

    const post_location_history_result = await historyModel.post_location_history(connection, history_name, user_id)
    console.log(history_name)
    const data = {
      post_location_history_result,
    }
    respondJson('성공적인 위치 히스토리 저장!!', data, res, 200)

  } catch (e) {

    if (e.message === '403') { 
      respondOnError('형식이 맞지 않습니다.', res, 403) 
    } else {
      respondOnError('서버 내부 에러', res, 500)
    }

  } finally {

    connection.release()

  }
}

const get_location_history = async (req, res) => {
  
  const connection = await dbConnection()
  const { user_id } = req.user
  
 
  try {

    const user_id_validation = Joi.validate(user_id, Joi.number().required())
    
    if (user_id_validation.error) {
      throw new Error(403)
    }

    const get_location_history_result = await historyModel.get_location_history(connection, user_id)
   

    console.log(get_location_history_result)
    const data = {
      get_location_history_result,
    }
    respondJson('성공적인 위치 히스토리 정보 반환!!', data, res, 200)
  } catch (e) {

    if (e.message === '403') {
      respondOnError('형식이 맞지 않습니다.', res, 403)
    } else {
      respondOnError('서버 내부 에러', res, 500)
    }

  } finally {
    connection.release()
  }
}


module.exports = {
  post_location_history,
  get_location_history,
  
}
