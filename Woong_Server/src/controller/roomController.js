const moment = require('moment')
const dbconnection = require('lib/dbConnection')
const chatting_room = require('models/roomModel')
const Joi = require('joi')
const signedurl = require('lib/signedurl')
const { respondJson, respondOnError } = require('../lib/response')


// headers : token
const get_room = async (req, res) => {

  const connection = await dbconnection() 
  const { user_id } = req.user
  console.log(user_id) 
  const array_data = []

  try {

    const user_id_validation = Joi.validate(user_id, Joi.number().required())

    if (user_id_validation.error) {
      throw new Error(403)
    }

    const get_roomList_result = await chatting_room.get_room_list(connection, user_id)
    console.log(get_roomList_result)


    // 한 사용자의 채팅방들의 메세지 리스트들을 2차원배열로 생성
    for (let i = 0; i < get_roomList_result.length; i += 1) {
    
      const get_message_result = await chatting_room.get_message_list(connection, get_roomList_result[i].chatting_room_id)
      if (get_message_result.length) {
        array_data.push(get_message_result)
      }
    }
    console.log(array_data)


    const message_data = []
    const date_data = []
    // 각 방의 마지막
    for (let i = 0; i < array_data.length; i += 1) {
    
      if (array_data[i].slice(-1)[0].content.length) {
        message_data.push(array_data[i].slice(-1)[0].content)
      }
    }
    console.log(message_data)

    for (let i = 0; i < array_data.length; i += 1) {
      if (array_data[i].slice(-1)[0].date.length) {
        date_data.push(array_data[i].slice(-1)[0].date)
      }
    }
    console.log(date_data)

    const interval_time_array = []
    for (let i = 0; i < date_data.length; i += 1) {
    
     
      const message_time = moment(date_data[i])
      const current_time = moment()
<<<<<<< HEAD
      console.log(current_time)
=======

      console.log()

>>>>>>> a18b16e022e8e2cf549c46723c108b42bbef9339
      let interval_time = `${moment.duration(current_time.diff(message_time)).asHours()} `
     
      if (interval_time < 1) {
        interval_time = `${Math.round(moment.duration(current_time.diff(message_time)).asMinutes())}분 전`
      } else if (interval_time >= 1 && interval_time < 24) {
        interval_time = `${Math.round(interval_time)}시간 전`
      } else {
        `${Math.round(interval_time /= 24)}일 전`
      }

      interval_time_array.push(interval_time)
    }

    const farmer_image = []
    for (let i = 0; i < get_roomList_result.length; i += 1) {
      
      farmer_image.push(await signedurl.getSignedUrl(get_roomList_result[i].farmer_image_key))

    }

    console.log(farmer_image)

    const data = []
    const market_name = []
    const unread_count = []
    const chatting_room_id = []
    const market_id = []
    for (let i = 0; i < get_roomList_result.length; i += 1) {
    
      market_name.push(get_roomList_result[i].market_name)
      unread_count.push(get_roomList_result[i].unread_count)
      chatting_room_id.push(get_roomList_result[i].chatting_room_id)
      market_id.push(get_roomList_result[i].market_id)
    }
  
    for (let i = 0; i < get_roomList_result.length; i += 1) {
    
      data.push({
        farmer_image: farmer_image[i],
        market_name: market_name[i],
        chatting_room_id: chatting_room_id[i],
        market_id: market_id[i],
        unread_count: unread_count[i],
        recent_message: message_data[i],
        interval_time: interval_time_array[i],

      })
      get_roomList_result[i].recent_message = message_data[i]
      get_roomList_result[i].interval_time = interval_time_array[i]
      
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
  get_room,
}
