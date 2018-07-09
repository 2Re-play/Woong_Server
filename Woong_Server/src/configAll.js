const dbConfig = require('../config/dbConfig')
const secretKey = require('../config/secretKey')

module.exports = {
  dbConfig,
  secretKey: secretKey[process.env.NODE_ENV],
}
