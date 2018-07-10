const put_signout = (connection, user_id) => {
  return new Promise((resolve, reject) => {
    const Query = `
    UPDATE
      woong_potato.WP_USER
    SET
      token = null
    WHERE
      user_id = ?
    `
    connection.query(Query, [user_id], (err, data) => {
      err && reject(err)
      resolve(data)
    })
  })
}


module.exports = {
  put_signout,

}
