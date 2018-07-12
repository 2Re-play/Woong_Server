const express = require('express')
const { multer } = require('..//lib/s3bucket')

const dummyImageCtrl = require('../controller/dummyImageContoller')

const upload = multer('item')
const dummyImage = express.Router()

dummyImage.post('/', upload.array('file', 70), dummyImageCtrl.postDummyImage)

module.exports = dummyImage
