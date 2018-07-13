const post_room = (connection, user_id, market_id) => {
  return new Promise((resolve, reject) => {
    const Query = `
    INSERT INTO
      woong_potato.WP_CHATTING_ROOM(
        user_id, 
        market_id, 
        unread_count 
      )
    VALUES
      (?, ?, 0)
    `
    connection.query(Query, [user_id, market_id], (err, data) => {
      err && reject(err)
      resolve(data)
    })
  })
}

const get_room_list = (connection, user_id) => {
  return new Promise((resolve, reject) => {
    const Query = `
    SELECT
      m.farmer_image_key, m.market_name, m.market_id, r.chatting_room_id, r.unread_count
    FROM
      woong_potato.WP_MARKET m,
      woong_potato.WP_CHATTING_ROOM r
    WHERE
      r.market_id = m.market_id
      and r.user_id = ?
    `
    connection.query(Query, [user_id], (err, data) => {
      err && reject(err)
      resolve(data)
    })
  })
}

const get_message_list = (connection, chatting_room_id) => {
  return new Promise((resolve, reject) => {
    const Query = `
    SELECT
      content, date
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

module.exports = {
  post_room,
  get_room_list,
  get_message_list,

}
