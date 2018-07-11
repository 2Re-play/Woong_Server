const token = require('lib/token')
const _ = require('lodash')
const { secretKey } = require('../configAll')

const { respondJson, respondOnError } = require('lib/response')

module.exports = async (req, res, next) => {
  const { usertoken } = req.headers
  // console.log(usertoken)
  try {
<<<<<<< HEAD
    req.user = await token.decode(usertoken, 'JvaWQiLCJkZXZpY2VfdG9rZW4isInNldF90a')
    // console.log(req.user)
=======
    req.user = await token.decode(usertoken, secretKey)
    // console.log())
>>>>>>> b5ae90d34ea2f39fe33a887925de0c4e068ec652
    if (_.isEmpty(req.user)) {
      throw new Error('user Authentication Error')
    } 
    next()
  } catch (e) {
    respondOnError(e.message, res, 401)
  }
}
