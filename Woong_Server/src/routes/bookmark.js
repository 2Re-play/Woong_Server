const express = require('express')
const bookmarkCtrl = require('../controller/bookmarkController')

const bookmark = express.Router()

bookmark.get('/', bookmarkCtrl.getBookmark)
bookmark.post('/:market_id', bookmarkCtrl.addBookmark)
bookmark.delete('/:market_id', bookmarkCtrl.deleteBookmark)

module.exports = bookmark
