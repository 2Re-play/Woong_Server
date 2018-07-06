const express = require('express')
const bookmarkCtrl = require('../controller/bookmarkController')

const bookmark = express.Router()

// 이주의 농부
bookmark.get('/', bookmarkCtrl.getBookmark)
module.exports = bookmark
