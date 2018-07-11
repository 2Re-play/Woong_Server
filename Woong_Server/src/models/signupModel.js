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

const get_allergy = (connection) => {
  return new Promise((resolve, reject) => {
    const Query = `
    SELECT
      allergy_id,allergy_name
    FROM
      woong_potato.WP_ALLERGY
    `
    connection.query(Query, (err, data) => {
      err && reject(err)
      resolve(data)
    })
  })
}

const duplicate_check = (connection, email) => {
  return new Promise((resolve, reject) => {
    const Query = `
    SELECT
      user_id
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


module.exports = {
  put_signout,
  get_allergy,
  duplicate_check,

}
