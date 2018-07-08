// 이 주의 농부  Controller

const { respondJson, respondOnError } = require('lib/response')
const dbConnection = require('lib/dbConnection')
const weeklyFarmerData = require('../models/weeklyFarmerModel')

exports.getWeeklyFarmer = async (req, res) => {
  const connection = await dbConnection()
  let weeklyFarmerResult
  try {
    [weeklyFarmerResult] = await weeklyFarmerData.getWeeklyFarmer(connection)
    respondJson('success', weeklyFarmerResult, res, 200)

  } catch (e) {
    console.log(e)
    respondOnError(e.message, res, 500)
  } finally {
    connection.release()
  }
}
