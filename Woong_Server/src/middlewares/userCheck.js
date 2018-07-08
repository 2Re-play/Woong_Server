const token = require('lib/token')
const _ = require('lodash')
const { secretKey } = require('../configAll')


module.exports = async (req, res, next) => {
  const userToken = req.headers
  try {
    req.session.user = await token.decode(userToken, secretKey)
    return next()
  } catch (e) {
  }
}
