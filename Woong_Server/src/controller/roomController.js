const moment = require('moment')
const dbconnection = require('lib/dbConnection')
const chatting_room = require('models/roomModel')
const Joi = require('joi')
const { respondJson, respondOnError } = require('../lib/response')

const room = async (req, res) => {

  const { user_id } = req.user
  console.log(user_id)
  const connection = await dbconnection()  
  const array_data = []

  try {

    const user_id_validation = Joi.validate(user_id, Joi.number().required())

    if (user_id_validation.error) {
      throw new Error(403)
    }

    const get_roomList_result = await chatting_room.get_room_list(connection, user_id)
    console.log(get_roomList_result)


    for (let i = 0; i < get_roomList_result.length; i += 1) {
    
      const get_message_result = await chatting_room.get_message_list(connection, get_roomList_result[i].chatting_room_id)
      array_data.push(get_message_result)
           
    }
    console.log(array_data)

    const message_data = []
    const date_data = []

    for (let i = 0; i < get_roomList_result.length; i += 1) {
    
      message_data.push(array_data[i].slice(-1)[0].content)
      
    }
    console.log(message_data)

    for (let i = 0; i < get_roomList_result.length; i += 1) {
    
      date_data.push(array_data[i].slice(-1)[0].date)
      
    }
    console.log(date_data)

    const interval_time_array = []
    for (let i = 0; i < date_data.length; i += 1) {
    
     
      const message_time = moment(date_data[i])
      const current_time = moment()

      let interval_time = `${moment.duration(current_time.diff(message_time)).asHours()} `
     

      if (interval_time < 1) {
        interval_time = `${Math.round(moment.duration(current_time.diff(message_time)).asMinutes())}분 전`
      } else if (interval_time > 1 && interval_time < 24) {
        interval_time = `${Math.round(interval_time)}시간 전`
      } else {
        `${interval_time /= 24}일 전`
      }

      interval_time_array.push(interval_time)
    }
  
    for (let i = 0; i < get_roomList_result.length; i += 1) {
    
      get_roomList_result[i].recent_message = message_data[i]
      get_roomList_result[i].interval_time = interval_time_array[i]
    }
   

    const data = {
      get_roomList_result,
    }


    respondJson('성공적인 채팅방 리스트 출력!!', data, res, 200)

  
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
  room,
}
