const put_signout = (connection, 
  email, 
  password, 
  user_name,
  birth, 
  phone_number, 
  login_type) => {
  return new Promise((resolve, reject) => {
    const Query = `
    INSERT INTO
      woong_potato.WP_USER(
        email, 
        password, 
        user_name, 
        birth, 
        phone_number, 
        login_type
      )
    VALUES
      (?, ?, ?, ?, ?, ?)
    `
    connection.query(Query, 
      [email, 
        password, 
        user_name,
        birth, 
        phone_number, 
        login_type,
      ], (err, data) => {
        err && reject(err)
        resolve(data)
      })
  })
}


module.exports = {
  put_signout,

}
