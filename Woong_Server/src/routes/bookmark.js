const express = require('express')
const bookmarkCtrl = require('../controller/bookmarkController')

const bookmark = express.Router()

bookmark.get('/', bookmarkCtrl.getBookmark)
module.exports = bookmark
