const dbConnection = require('lib/dbConnection')
const locationModel = require('models/locationModel')
const Joi = require('joi')
const { respondJson, respondOnError } = require('../lib/response')


const put_location = async (req, res) => {

  const connection = await dbConnection()  
  const { user_id } = req.user
  const { latitude } = req.body
  const { longitude } = req.body
  const { address } = req.body

  console.log(req.body)
  console.log(user_id)
  console.log(latitude)
  console.log(longitude)
  console.log(address)

  const sheme = {
    user_id: Joi.number().required(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
    address: Joi.string().required(),
  }

  const validation_data = {
    user_id,
    latitude,
    longitude,
    address,
  }
  
  try {

    const input_validation = Joi.validate(validation_data, sheme)

    if (input_validation.error) {
      throw new Error(403)
    }

    const put_location_result = await locationModel.put_location(connection, user_id, latitude, longitude, address)
    console.log(put_location_result)
    const data = {
      put_location_result,
    }
    respondJson('성공적인 위치 데이터 저장!!', data, res, 200)

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

const get_location = async (req, res) => {
  
  const connection = await dbConnection()
  const { user_id } = req.user
  
 
  try {

    const user_id_validation = Joi.validate(user_id, Joi.number().required())
    
    if (user_id_validation.error) {
      throw new Error(403)
    }

    const get_location_result = await locationModel.get_location(connection, user_id)
   
    let [{ address }] = get_location_result

    address = address.split(' ')
    
    const real_address = `${address[1]} ${address[2]}` 

    console.log(real_address)
    const data = {
      real_address,
    }
    respondJson('성공적인 위치 정보 반환!!', data, res, 200)
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
  put_location,
  get_location,
  
}
