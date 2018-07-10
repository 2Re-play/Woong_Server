const express = require('express')

const { multer } = require('../lib/s3bucket')

const reviewCtrl = require('../controller/reviewController')

const upload = multer('review')


const review = express.Router()

review.post('/:market_id', upload.array('file', 3), reviewCtrl.postReview)

module.exports = review
