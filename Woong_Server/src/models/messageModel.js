const get_message = (connection, chatting_room_id) => {
  return new Promise((resolve, reject) => {
    const Query = `
    SELECT
      sender_user_id, content, day_time
    FROM
      woong_potato.WP_CHATTING_MESSAGE
    WHERE
      chatting_room_id = ?
    `
    connection.query(Query, [chatting_room_id], (err, data) => {
      err && reject(err)
      resolve(data)
    })
  })
}


const post_chat_message = (connection, chatting_room_id, user_id, content, current_time) => {
  return new Promise((resolve, reject) => {
    const Query = `
    INSERT INTO
      woong_potato.WP_CHATTING_MESSAGE(
        chatting_room_id, 
        sender_user_id, 
        content, 
        day_time 
      )
    VALUES
      (?, ?, ?, ?)
    `
    connection.query(Query, [chatting_room_id, user_id, content, current_time], (err, data) => {
      err && reject(err)
      resolve(data)
    })
  })
}

module.exports = {
  get_message,
  post_chat_message,

}
