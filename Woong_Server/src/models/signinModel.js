const signin_validation = (connection, email) => {
  return new Promise((resolve, reject) => {
    const Query = `
    SELECT
      user_id,email,password
    FROM
      woong_potato.WP_USER
    WHERE
      email = ?
    `
    connection.query(Query, [email], (err, data) => {
      err && reject(err)
      resolve(data)
    })
  })
}

const signin_insert = (db_idx, user_token, connection) => {
  return new Promise((resolve, reject) => {
    const Query = `
    UPDATE 
      woong_potato.WP_USER 
    SET 
      token = ?
    WHERE
      user_id = ?
    `
    connection.query(Query, [user_token, 1], (err, data) => {
      err && reject(err)
      resolve(data)
    })
  })
}

module.exports = {
  signin_validation,
  signin_insert,

}
