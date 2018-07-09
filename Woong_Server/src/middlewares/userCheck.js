const token = require('lib/token')
const _ = require('lodash')
const { secretKey } = require('../configAll')


module.exports = async (req, res, next) => {
  const { usertoken } = req.headers
  try {
    req.user = await token.decode(usertoken, 'abc')
    // console.log())
    if (_.isEmpty(req.user)) {
      throw new Error('user AuThentication Error')
    } 
    next()
  } catch (e) {
    throw new Error(e)
  }
}
