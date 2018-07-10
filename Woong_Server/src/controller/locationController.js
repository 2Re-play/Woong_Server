const dbConnection = require('lib/dbConnection')
const locationModel = require('models/locationModel')
const { respondJson, respondOnError } = require('../lib/response')

const put_location = async (req, res) => {

  const { user_id } = req.user
  const { latitude } = req.body
  const { longitude } = req.body
  const { address } = req.body

  console.log(req.body)
  console.log(user_id)
  console.log(latitude)
  console.log(longitude)
  console.log(address)

  const connection = await dbConnection()

  try {

    const put_location_result = await locationModel.put_location(connection, user_id, latitude, longitude, address)
    console.log(put_location_result)
    const data = {
      put_location_result,
    }
    respondJson('성공적인 위치 데이터 저장!!', data, res, 200)

  } catch (e) {

    respondOnError(e, res, 500)

  } finally {

    connection.release()

  }
}

const get_location = async (req, res) => {
  
  const { user_id } = req.user
  console.log(user_id)
  const connection = await dbConnection()

  
  try {
    const get_location_result = await locationModel.get_location(connection, user_id)
    console.log(get_location_result)
   
    let [{ address }] = get_location_result

    address = address.split(' ')
    
    const real_address = `${address[1]} ${address[2]}` 

    const data = {
      real_address,
    }
    respondJson('성공적인 위치 정보 반환!!', data, res, 200)
  } catch (e) {
    respondOnError('서버 내부 에러', res, 500)
  } finally {
    connection.release()
  }
}


module.exports = {
  put_location,
  get_location,
  
}
