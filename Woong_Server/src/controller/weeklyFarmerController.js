const weeklyFarmerData = require('../models/weeklyFarmerModel')
const dbConnection = require('../lib/dbConnection')

exports.getWeeklyFarmer = async (req, res) => {
  const connection = await dbConnection()
  console.log(1)
  let weeklyFarmerResult
  try {
    [weeklyFarmerResult] = await weeklyFarmerData.getWeeklyFarmer(connection)

    res.status(200).send({
      message: 'success',
      data: weeklyFarmerResult,
    })
  } catch (e) {
    console.log(e)
    res.status(500).send({
      message: 'fail',
    })
  } finally {
    connection.release()
  }
}
