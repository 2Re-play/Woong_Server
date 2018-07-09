const dbConnection = require('lib/dbConnection')
const decoding = require('lib/token')
const secretKey = require('../configAll')


const room = async(req, res) => {
  const user_token = req.headers.token

  const user_data = decoding.decoding(user_token, secretKey.secretKey)

  console.log(user_data)

  const getRoomList = await dbConnection(connection,user_data.user_id)
  
  try {
    // const room = roomModel.
    
  } catch (e) {
    res.status(500)
    res.send(e)
  }
  connection.release()
  
  
}


module.exports = {
  room,
}
