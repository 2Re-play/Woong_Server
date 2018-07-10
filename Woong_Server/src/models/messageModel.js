const get_message = (connection, chatting_room_id) => {
  return new Promise((resolve, reject) => {
    const Query = `
    SELECT
      sender, content, day_time
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


const get_user_id = (connection, chatting_room_id) => {
  return new Promise((resolve, reject) => {
    const Query = `
    SELECT
      user_id
    FROM
      woong_potato.WP_CHATTING_ROOM 
    WHERE
      chatting_room_id = ?
    `
    connection.query(Query, [chatting_room_id], (err, data) => {
      err && reject(err)
      resolve(data)
    })
  })
}

module.exports = {
  get_message,
  get_user_id,

}
