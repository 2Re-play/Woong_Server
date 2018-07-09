const cartmodel = require('../models/cartModel')
const dbConnection = require('../lib/dbConnection')

// 장바구니 등록
exports.InsertCart = async (req, res) => {
  const connection = await dbConnection()
  const { user_token } = req.headers
  const { item_id } = req.params
  let data = {}
  data = {
    item_id,
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
// 장바구니  해제 
exports.deleteCart = async (req, res) => {
  const connection = await dbConnection()
  const { user_token } = req.headers
  const { item_id } = req.params
  let data = {}
  data = {
    item_id,
    user_token,
  }
  try {
    cartmodel.deletecart(connection, data)
    res.status(200).send({
      message: 'successfully delete cart data',
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

// 장바구니 목록
exports.getCart = async (req, res) => {
  const connection = await dbConnection()
  const { user_token } = req.headers
  let data = {}
  data = {
    user_token,
  }
  try {
    cartmodel.getcart(connection, data)
    res.status(200).send({
      message: 'successfully get cart data',
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
