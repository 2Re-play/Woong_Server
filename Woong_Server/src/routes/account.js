const express = require('express')
const signinController = require('controller/signinController')
const signupController = require('controller/signupController')
const signoutController = require('controller/signoutController')
const locationController = require('controller/locationController')


const account = express.Router()

/* GET home page. */
account.post('/signin/app', signinController.signin_app)
account.post('/signin/sns', signinController.signin_sns)
account.post('/signup', signupController.signup)
account.put('/signout', signoutController.signout)
account.post('/location', locationController.post_location)
account.get('/location', locationController.get_location)
account.put('/location', locationController.put_location)


module.exports = account
