const moment = require('moment')
const dbconnection = require('lib/dbConnection')
const messageModel = require('models/messageModel')
const Joi = require('joi')
const { respondJson, respondOnError } = require('../lib/response')


const get_message = async (req, res) => {

  const connection = await dbconnection()

  // user_id : 디코딩된 user_id값
  // params : 채팅방의 id값
  const { user_id } = req.user
  const { chatting_room_id } = req.params
    
  const validation_data = {
    user_id,
    chatting_room_id,
  }

  const sheme = {
    user_id: Joi.number().required(),
    chatting_room_id: Joi.number().required(),
  }

  console.log(user_id)
  console.log(chatting_room_id)
  
  try {

    const input_validation = Joi.validate(validation_data, sheme)

    if (input_validation.error) {
      throw new Error(403)
    }

    // 메세지함 입장시 unread_count
    const set_zero_result = await messageModel.set_zero_unread_count(connection, chatting_room_id)
    // console.log(set_zero_result)

    const get_message_result = await messageModel.get_message(connection, chatting_room_id)
    console.log(get_message_result)

    const weekdays = []
    const real_time = []
    const date = []
    for (let i = 0; i < get_message_result.length; i += 1) {
      
      const time = get_message_result[i].date.split(' ')[1]

      weekdays.push(get_message_result[i].weekdays)
      real_time.push(time)

      date[i] = `${weekdays[i]}, ${real_time[i]}`
    }

    
    const send_data = []
    for (let i = 0; i < get_message_result.length; i += 1) {
  
      send_data.push({
        send_user_id: get_message_result[i].send_user_id,
        content: get_message_result[i].content,
        date: date[i],

      })     
    }

    console.log(send_data)
    
    // 메세지보낸 사람이 본인이라면 user_id = 0 으로 변환
    for (let i = 0; i < send_data.length; i += 1) {
      if (user_id === send_data[i].send_user_id) {

        send_data[i].send_user_id = 0

      }
    }

    console.log(send_data)

    const data = {
      send_data,
    }

    respondJson('성공적으로 채팅 리스트 반환!!', data, res, 200)


  } catch (e) {

    if (e.message === '403') { 
      respondOnError('형식이 맞지 않습니다.', res, 403) 
    } else {
      respondOnError('서버 내부 에러', res, 500)
    }

  } finally {
    
    connection.release()

  }
}

const post_message = async (req, res) => {

  const connection = await dbconnection() 

  const { user_id } = req.user
  const { chatting_room_id } = req.body
  const { content } = req.body

  moment.locale('ko', {
    weekdays: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  })

  const sheme = {
    user_id: Joi.number().required(),
    chatting_room_id: Joi.number().required(),
    content: Joi.string().required(),
  }

  const validation_data = {
    user_id,
    chatting_room_id,
    content,
  }
  console.log(user_id)
  console.log(chatting_room_id)
  console.log(content)

 
  try {
    
    const input_validation = Joi.validate(validation_data, sheme)

    if (input_validation.error) {
      throw new Error(403)
    }

    const weekdays = moment().locale('ko').format('dddd')
    const date = moment().locale('ko').format('YYYY-MM-DD HH:mm') // 데이터 타입 VARCHAR

    console.log(weekdays)
    console.log(date)

    const [get_market_id] = await messageModel.get_market_id(connection, user_id)

    if (get_market_id.market_id !== 0) {
      const post_message_result = await messageModel.post_chat_message(connection, chatting_room_id, get_market_id.market_id, content, weekdays, date)
      console.log(post_message_result)     
    } else {
      const post_message_result = await messageModel.post_chat_message(connection, chatting_room_id, user_id, content, weekdays, date)
      console.log(post_message_result)
    }
    

    const count_up_unread_count_result = await messageModel.count_up_unread_count(connection, chatting_room_id)

    console.log(count_up_unread_count_result)

    const data = {}

    respondJson('성공적으로 채팅 메세지 등록 !!', data, res, 200)

  } catch (e) {

    if (e.message === '403') { 
      respondOnError('형식이 맞지 않습니다.', res, 403) 
    } else {
      respondOnError('서버 내부 에러', res, 500)
    }

  } finally {
    
    connection.release()

  }
}


module.exports = {
  get_message,
  post_message,
}
