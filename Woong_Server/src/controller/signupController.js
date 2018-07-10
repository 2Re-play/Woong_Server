const jwt = require('lib/token')
const dbconnection = require('lib/dbConnection')
const secretKey = require('configAll')
const signoutModel = require('models/signoutModel')

const signup = (req, res) => {
  const email = req.body.email
  const password = req.body.email
  const user_name = req.body.user_name
  const birth = req.body.birth
  const phone_number = req.body.email
  const login_type = req.body.login_type
}


module.exports = {
  signup,
}
