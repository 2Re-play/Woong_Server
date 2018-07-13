const express = require('express')
const signinController = require('controller/signinController')
const signupController = require('controller/signupController')
const signoutController = require('controller/signoutController')
const locationController = require('controller/locationController')
const healthController = require('controller/healthController')
const historyController = require('controller/historyController')
const needAuth = require('middlewares/userCheck')

const account = express.Router()

/* GET home page. */
account.post('/signin/app', signinController.signin_app)
account.post('/signup', signupController.signup)
account.put('/signout', needAuth, signoutController.signout)
account.get('/health', needAuth, healthController.getHealthCheck)
account.get('/location', needAuth, locationController.get_location)
account.put('/location', needAuth, locationController.put_location)
account.get('/location/history', needAuth, historyController.get_location_history)
account.post('/location/history', needAuth, historyController.post_location_history)


module.exports = account
