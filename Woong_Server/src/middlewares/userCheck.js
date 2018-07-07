const token = require('lib/token')
const _ = require('lodash')
const { secretKey } = require('../confingAll')


module.exports = async (req, res, next) => {
  const userToken = req.headers
  try {
    req.session.user = await token.decode(userToken, secretKey)
    return next()
  } catch (e) {
  }
}
