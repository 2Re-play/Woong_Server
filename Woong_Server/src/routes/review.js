const express = require('express')
const needAuth = require('middlewares/userCheck')
const { multer } = require('..//lib/s3bucket')

const reviewCtrl = require('../controller/reviewController')

const upload = multer('review')


const review = express.Router()

review.post('/:market_id', upload.array('file', 3), needAuth, reviewCtrl.postReview)

module.exports = review
