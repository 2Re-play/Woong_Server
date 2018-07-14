const express = require('express')
const roomController = require('controller/roomController')
const messageController = require('controller/messageController')
const needAuth = require('middlewares/userCheck')

const chat = express.Router()

/* GET home page. */
chat.get('/room/:market_id', needAuth, roomController.get_chatting_room_id)
chat.get('/room', needAuth, roomController.get_room)
chat.post('/message', needAuth, messageController.post_message)
chat.get('/message/:chatting_room_id', needAuth, messageController.get_message)


module.exports = chat
