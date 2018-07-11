const dbconnection = require('lib/dbConnection')
const chatting_room = require('models/roomModel')
const { respondJson, respondOnError } = require('../lib/response')

const room = async (req, res) => {

  const { user_id } = req.user
  console.log(user_id)
  const connection = await dbconnection()  
  const array_data = []

  try {

    const get_roomList_result = await chatting_room.get_room_list(connection, user_id)
    console.log(get_roomList_result)


    for (let i = 0; i < get_roomList_result.length; i++ ) {
    
      const get_message_result = await chatting_room.get_message_list(connection, get_roomList_result[i].chatting_room_id)
      array_data.push(get_message_result)
           
    }

    const message_data = []

    for (let i = 0; i < get_roomList_result.length; i++ ) {
    
      message_data.push(array_data[i].slice(-1)[0].content)
      
    }


    for (let i = 0; i < get_roomList_result.length; i++ ) {
    
      get_roomList_result[i].recent_message = message_data[i]
      
    }

    const data = {
      get_roomList_result,
    }


    respondJson('성공적인 채팅방 리스트 출력!!', data, res, 200)

  
  } catch (e) {

    respondOnError(e, res, 500)

  } finally {
    connection.release()

  }
  
  
}


module.exports = {
  room,
}
