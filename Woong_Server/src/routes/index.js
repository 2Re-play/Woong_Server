const express = require('express')
const category = require('./category')

const router = express.Router()

/* GET home page. */
router.use('/category', category)

module.exports = router
