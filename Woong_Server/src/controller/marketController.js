const marketmodel = require('../models/marketModel')
const dbConnection = require('../lib/dbConnection')

// 판매자 마켓 소개
exports.IntroMarket = async (req, res) => {
  const connection = await dbConnection()
  const { market_id } = req.params
  let data = {}
  let market_introduce
  data = {
    market_id,
  }
  try {
    [market_introduce] = await marketmodel.introduce(connection, data)
    const result = {
      market_introduce,
    }
    res.status(200).send({
      message: 'successfully get market data',
      data: result, // TODO : 나와 마켓 사이 거리 km 기능 구현
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
// 판매자 특정상품 정보 보기
exports.ItemDetail = async (req, res) => {
  const connection = await dbConnection()
  const { market_id, item_id } = req.params
  let data = {}
  let itemdetail
  data = {
    market_id,
    item_id,
  }
  try {
    [itemdetail] = await marketmodel.itemdetail(connection, data)
    const result = {
      itemdetail,
    }
    res.status(200).send({
      message: 'successfully get food detail data',
      data: result, // 마켓과 나랑 거리 추가하기
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
