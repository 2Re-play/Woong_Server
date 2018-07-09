const dbconnection = require('lib/dbconnection')
const jwt = require('lib/token')
const secret = require('confingAll')
const locationModel = require('models/locationModel')

const put_location = async (req, res) => {

  const token = req.headers.token
  const latitude = req.body.latitude
  const longitude = req.body.longitude
  const secret_key = secret.secretKey

  console.log(token)
  console.log(latitude)
  console.log(longitude)
  console.log(secret_key)


  const connection = await dbconnection()

  const decode_result = await jwt.decode(token, secret_key)
  const user_id = decode_result.user_id
  const address = '서울시 마포구'
  console.log(user_id)
 
  const post_lcation_result = await locationModel.put_location(connection, user_id, latitude, longitude, address)
  console.log(post_lcation_result)

  connection.release()
  res.status(200).send('Successfully Put Location')

  
}

const get_location = async (req, res) => {
  
  const token = req.headers.token

  const connection = await dbconnection()

  const secret_key = secret.secretKey
  const decode_result = await jwt.decode(token, secret_key)
  const user_id = decode_result.user_id
  
  console.log(user_id)

  const get_location_result = await locationModel.get_location(connection, user_id)
  console.log(get_location_result)
  connection.release()
  res.status(200).send('Successfully Get Location')

}


module.exports = {
  put_location,
  get_location,
  
}
