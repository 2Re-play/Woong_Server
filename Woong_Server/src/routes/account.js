const express = require('express')
const signinController = require('controller/signinController')
const signupController = require('controller/signupController')

const account = express.Router()

/* GET home page. */
account.post('/signin/app', signinController.signin_app)
account.post('/signin/sns', signinController.signin_sns)
account.post('/signup', signupController.signup)

module.exports = account
