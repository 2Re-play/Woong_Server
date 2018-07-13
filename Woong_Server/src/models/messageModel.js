const check_existing_room = (connection, user_id, market_id) => {
  return new Promise((resolve, reject) => {
    const Query = `
    SELECT
      chatting_room_id
    FROM
      woong_potato.WP_CHATTING_ROOM
    WHERE
      user_id = ? 
      AND market_id = ?
    `
    connection.query(Query, [user_id, market_id], (err, data) => {
      err && reject(err)
      resolve(data)
    })
  })
}

const get_message = (connection, chatting_room_id) => {
  return new Promise((resolve, reject) => {
    const Query = `
    SELECT
      send_user_id, content, weekdays, date
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


const post_chat_message = (connection, chatting_room_id, user_id, content, weekdays, date) => {
  return new Promise((resolve, reject) => {
    const Query = `
    INSERT INTO
      woong_potato.WP_CHATTING_MESSAGE(
        chatting_room_id, 
        send_user_id, 
        content, 
        weekdays,
        date 
      )
    VALUES
      (?, ?, ?, ?, ?)
    `
    connection.query(Query, [chatting_room_id, user_id, content, weekdays, date], (err, data) => {
      err && reject(err)
      resolve(data)
    })
  })
}

const count_up_unread_count = (connection, chatting_room_id) => {
  return new Promise((resolve, reject) => {
    const Query = `
    UPDATE
      woong_potato.WP_CHATTING_ROOM
    SET
      unread_count = unread_count + 1
    WHERE
      chatting_room_id = ?    
    `
    connection.query(Query, [chatting_room_id], (err, data) => {
      err && reject(err)
      resolve(data)
    })
  })
}

const set_zero_unread_count = (connection, chatting_room_id) => {
  return new Promise((resolve, reject) => {
    const Query = `
    UPDATE
      woong_potato.WP_CHATTING_ROOM
    SET
      unread_count = 0
    WHERE
      chatting_room_id = ?    
    `
    connection.query(Query, [chatting_room_id], (err, data) => {
      err && reject(err)
      resolve(data)
    })
  })
}

const get_market_id = (connection, user_id) => {
  return new Promise((resolve, reject) => {
    const Query = `
    SELECT
      m.market_id
    FROM
      woong_potato.WP_USER u,
      woong_potato.WP_MARKET m
    WHERE
      u.user_id = m.cr_user AND u.user_id = ?
    `
    connection.query(Query, [user_id], (err, data) => {
      err && reject(err)
      resolve(data)
    })
  })
}

module.exports = {
  get_market_id,
  check_existing_room,
  get_message,
  post_chat_message,
  count_up_unread_count,
  set_zero_unread_count,

}
