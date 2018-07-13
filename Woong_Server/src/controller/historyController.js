const dbConnection = require('lib/dbConnection')
const historyModel = require('models/historyModel')
const Joi = require('joi')
const { respondJson, respondOnError } = require('../lib/response')


const post_location_history = async (req, res) => {
  const { user_id } = req.user
  const { history_name } = req.body
  const { longitude } = req.body
  const { latitude } = req.body
  let data = {}
  data = {
    user_id,
    history_name,
    latitude,
    longitude,
  }
  console.log(data)
  const connection = await dbConnection() 
  try {
    console.log(2)
    const result = await historyModel.post_location_history(connection, data)
    console.log(result)
    const info = {
      result,
    }
    respondJson('성공적인 위치 히스토리 저장!!', info, res, 200)

  } catch (e) {
    console.log(e)
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
   
    const data = {
      get_location_history_result,
    }
    respondJson('성공적인 위치 히스토리 정보 반환!!', data, res, 200)
  } catch (e) {

    if (e.message === '403') {
      respondOnError('형식이 맞지 않습니다.', res, 403)
    } 
  } finally {
    connection.release()
  }
}


module.exports = {
  post_location_history,
  get_location_history,
  
}
