const { respondJson } = require('../lib/response')

const getHealthCheck = async (req, res) => {
  const { user } = req

  const data = { user }
  respondJson('HealthCheck', data, res, 200)
}


module.exports = {
  getHealthCheck,
}
