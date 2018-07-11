const moment = require('moment')
const dbconnection = require('lib/dbConnection')
const messageModel = require('models/messageModel')
const { respondJson, respondOnError } = require('../lib/response')


const get_message = async (req, res) => {

  const connection = await dbconnection()

  // user_id : 디코딩된 user_id값
  // params : 채팅방의 id값
  const { user_id } = req.user
  const { chatting_room_id } = req.params
    

  console.log(user_id)
  console.log(chatting_room_id)
  
  try {

    // 메세지함 입장시 unread_count
    const put_unread_result = await messageModel.set_zero_unread_count(connection, chatting_room_id)

    const get_message_result = await messageModel.get_message(connection, chatting_room_id)
    console.log(get_message_result)

    for (let i = 0; i < get_message_result.length; i++) {
      if (user_id === get_message_result[i].send_user_id) {

        get_message_result[i].send_user_id = 'me'

      }
    }

    const data = {
      get_message_result,
    }

    respondJson('성공적으로 채팅 리스트 반환!!', data, res, 200)


  } catch (e) {

    respondOnError('서버 내부 에러', res, 500)

  } finally {
    
    connection.release()

  }
}

const post_message = async (req, res) => {

  const { user_id } = req.user
  const { chatting_room_id } = req.body
  const { content } = req.body

  const connection = await dbconnection()  
  
  console.log(user_id)
  console.log(chatting_room_id)
  console.log(content)

  moment.locale('ko', {
    weekdays: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  })

  try {
    

    const current_time = moment().locale('ko').format('dddd, HH:mm ') // 데이터 타입 VARCHAR

    console.log(current_time)

        
    const post_message_result = await messageModel.post_chat_message(connection, chatting_room_id, user_id, content, current_time)
    console.log(post_message_result)

    const count_up_unread_count_result = await messageModel.count_up_unread_count(connection, chatting_room_id)

    console.log(count_up_unread_count_result)

    const data = {
      post_message_result,
    }

    respondJson('성공적으로 채팅 메세지 등록 !!', data, res, 200)


  } catch (e) {

    respondOnError('서버 내부 에러', res, 500)

  } finally {
    
    connection.release()
  }
}


module.exports = {
  get_message,
  post_message,
}
