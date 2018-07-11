const express = require('express')
const needAuth = require('middlewares/userCheck')
const bookmarkCtrl = require('../controller/bookmarkController')

const bookmark = express.Router()

bookmark.get('/', needAuth, bookmarkCtrl.getBookmark)
bookmark.post('/:market_id', needAuth, bookmarkCtrl.addBookmark)
bookmark.delete('/:market_id', needAuth, bookmarkCtrl.deleteBookmark)

module.exports = bookmark
