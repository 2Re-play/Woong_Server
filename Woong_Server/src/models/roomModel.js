exports.getRoomList = (user_id, connection) => {
  return new Promise((resolve, reject) => {
    const Query = 'SELECT * FROM woong_potato WHERE user_id = ?'
    connection.query(Query, [user_id], (err, data) => {
      err && reject(err)
      resolve(data)
    })
  })
}