const post_location_history = (connection, history_name, user_id) => {
  return new Promise((resolve, reject) => {
    const Query = `
    INSERT INTO
      woong_potato.WP_SEARCH_HISTORY(
        history_name,
        user_id
      )
    VALUES
      (?,?)
    `
    connection.query(Query, [history_name, user_id], (err, data) => {
      err && reject(err)
      resolve(data)
    })
  })
}

const get_location_history = (connection, user_id) => {
  return new Promise((resolve, reject) => {
    const Query = `
    SELECT
      history_name
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
