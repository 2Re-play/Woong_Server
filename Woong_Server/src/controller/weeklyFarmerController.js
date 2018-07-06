const dbConnection = require('lib/dbConnection')
const weeklyFarmerData = require('../models/weeklyFarmerModel')

exports.getWeeklyFarmer = async (req, res) => {
  const connection = await dbConnection()
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
      message: 'Internal Server Error',
    })
  } finally {
    connection.release()
  }
}
