const modelcart = require('../models/modelcart')
const dbConnection = require('../../lib/dbConnection')

const InsertCart = async (req, res) => {
  const connection = await dbConnection()
  const { user_token } = req.headers
  const { item_idx } = req.params
  let data = {}
  data = {
    item_idx,
    user_token,
  }
  console.log('1')
  modelcart.postcart(connection, data, (err) => {
    if (err) {
      res.status(500).send({
        message: 'Internal Server error',
      })
      connection.release()
    } else {
      console.log('2')
      res.status(200).send({
        message: 'Successfully Insert Cart data',
      })
      connection.release()
    }
  })
 

}

module.exports = {
  InsertCart,
}
