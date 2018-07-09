const put_location = (connection, user_id, latitude, longitude, address) => {
  return new Promise((resolve, reject) => {
    const Query = `
    UPDATE
      woong_potato.WP_USER
    SET
      latitude = ?, 
      longitude = ?, 
      address = ?
    WHERE
      user_id = ?       
    `
    connection.query(Query, [latitude, longitude, address, user_id], (err, data) => {
      err && reject(err)
      resolve(data)
    })
  })
}

const get_location = (connection, user_id) => {
  return new Promise((resolve, reject) => {
    const Query = `
    SELECT
      address
    FROM
      woong_potato.WP_USER
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
  put_location,
  get_location,

}
