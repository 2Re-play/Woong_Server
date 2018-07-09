const jwt = require('lib/token')
const dbconnection = require('lib/dbconnection')
const secretKey = require('configAll')
const signoutModel = require('models/signoutModel')

const signout = async (req, res) => {
  
  const token = req.headers.token
  const secret_key = secretKey.secretKey
  
  console.log(token)
  console.log(secret_key)

  const connection = await dbconnection()
  const decode_result = await jwt.decode(token, secret_key)
  const user_id = decode_result.user_id

  
  console.log(decode_result)
  console.log(decode_result.user_id)

  const signout_result = await signoutModel.put_signout(connection, user_id)
  console.log(signout_result)

}


module.exports = {
  signout,
}
