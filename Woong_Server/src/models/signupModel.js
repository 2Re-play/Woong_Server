const post_signup = (connection, 
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

const post_allergy = (connection, allergy_id, user_id) => {
  return new Promise((resolve, reject) => {
    const Query = `
    INSERT INTO
      woong_potato.WP_USER_ALLERGY_LIST(
        allergy_id,
        user_id
      )
    VALUES
      (?, ?)
    `
    connection.query(Query, [allergy_id, user_id], (err, data) => {
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
  post_signup,
  post_allergy,
  duplicate_check,

}
