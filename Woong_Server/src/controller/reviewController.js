// 후기(리뷰) 가져오기/등록 Controller
const Joi = require('joi')
const aws = require('aws-sdk')

const dbConnection = require('lib/dbConnection')
const { respondOnError } = require('lib/response')
const reviewData = require('../models/reviewModel')
const signedurl = require('../lib/signedurl')

aws.config.loadFromPath('./config/credentials.json')

// const s3 = new aws.S3()

// 1. 후기 (리뷰) 쓰기
exports.postReview = async (req, res) => {
  console.log(req.files)
  const connection = await dbConnection()
  let postReviewResult
  const { user_id } = req.body
  const { market_id } = req.params
  const { content } = req.body
  const { rate_speed } = req.body
  const { rate_fresh } = req.body
  const { rate_taste } = req.body
  const { rate_kindness } = req.body

  let data = {}
  data = {
    user_id,
    market_id,
    content,
    rate_speed,
    rate_fresh,
    rate_taste,
    rate_kindness,
  }
  try {
    postReviewResult = await reviewData.postReview(connection, data)
    res.status(200).send({
      message: 'success',
      result: postReviewResult,
    })

  } catch (e) {
    console.log(e)
  } finally {
    connection.release()
  }
}

// 2. 후기 (리뷰) 가져오기
exports.getReview = async (req, res) => {
  const connection = await dbConnection()
  let reviewRateResult // 마켓의 후기의 별점
  let reviewImagesResult // 후기 이미지파일
  let reviewContentResult // 사용자별 후기내용
  const { market_id } = req.params
  let data = {}
  data = {
    market_id,
  }

  const validation = Joi.validate(market_id, Joi.number().required())

  if (validation.error) {
    respondOnError(validation.error, res, 422)
  }

  try {
    [reviewRateResult] = await reviewData.getReviewRate(connection, data) 
    reviewImagesResult = await reviewData.getReviewImages(connection, data)

    for (let i in reviewImagesResult) {
      console.log(await signedurl.getSignedUrl(reviewImagesResult[i].file_key))
      reviewImagesResult[i].file_key = await signedurl.getSignedUrl(reviewImagesResult[i].file_key)
    }

    reviewContentResult = await reviewData.getReviewContent(connection, data)

    res.status(200).send({
      message: 'success',
      rate: reviewRateResult,
      images: reviewImagesResult,
      reviews: reviewContentResult,
    })
  } catch (e) {
    console.log(e)
    res.status(500).send({
      message: 'Interner Server Error',
    })
  } finally {
    connection.release()
  }
}
