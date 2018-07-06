const cartmodel = require('../models/cartModel')
const dbConnection = require('../lib/dbConnection')


exports.InsertCart = async (req, res) => {
  const connection = await dbConnection()
  const { user_token } = req.headers
  const { item_idx } = req.params
  let data = {}
  data = {
    item_idx,
    user_token,
  }
  try {
    cartmodel.postcart(connection, data)
    res.status(200).send({
      message: 'successfully Insert cart data',
    })
  } catch (e) {
    console.log(e)
    res.status(500).send({
      message: 'Internal Server error',
    })
  } finally {
    connection.release()
  }
}
