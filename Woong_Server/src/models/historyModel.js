const post_location_history = (connection, data) => {
  return new Promise((resolve, reject) => {
    const Query = `
    INSERT INTO
      WP_SEARCH_HISTORY(
        history_name,latitude,longitude,user_id)
    VALUES
      (?,?,?,?)
    `
    console.log(data)
    connection.query(Query, [data.history_name, data.latitude, data.longitude, data.user_id], (err) => {
      err && reject(err)
      resolve({})
    })
  })
}


const get_location_history = (connection, user_id) => {
  return new Promise((resolve, reject) => {
    const Query = `
    SELECT
      history_name,latitude,longitude
    FROM
      woong_potato.WP_SEARCH_HISTORY
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
  post_location_history,
  get_location_history,

}
