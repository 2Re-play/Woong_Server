const express = require('express')
const roomController = require('controller/roomController')
const messageController = require('controller/messageController')


const chat = express.Router()

/* GET home page. */
chat.get('/room', roomController.room)
chat.post('/message/:chatting_room_id', messageController.post_message)
chat.get('/message/:chatting_room_id', messageController.get_message)


module.exports = chat
