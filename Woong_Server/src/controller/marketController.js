const marketmodel = require('../models/marketModel')
const dbConnection = require('../lib/dbConnection')


exports.IntroMarket = async (req, res) => {
  const connection = await dbConnection()
  const { market_id } = req.params
  let data = {}
  let introMarketResult
  data = {
    market_id,
  }
  try {
    [introMarketResult] = await marketmodel.introduce(connection, data)
    res.status(200).send({
      message: 'successfully get market data',
      data: introMarketResult, // 마켓과 나랑 거리 추가하기
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
