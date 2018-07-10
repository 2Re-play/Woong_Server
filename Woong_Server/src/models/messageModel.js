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


// const get_user_name = (connection, user_id) => {
//   return new Promise((resolve, reject) => {
//     const Query = `
//     SELECT
//       user_name
//     FROM
//       woong_potato.WP_CHATTING_ROOM 
//     WHERE
//       user_id = ?
//     `
//     connection.query(Query, [user_id], (err, data) => {
//       err && reject(err)
//       resolve(data)
//     })
//   })
// }

module.exports = {
  get_message,
  // get_user_name,

}
