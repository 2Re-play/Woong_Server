exports.selectSubListByMain = (connection, main_id) => {
  return new Promise((resolve, reject) => {
    const Query = `
    SELECT
      *
    FROM
      WP_CATEGORY_SUB
    WHERE
      main_id = ?
    `
    connection.query(Query, [main_id], (err, data) => {
      err && reject(err)
      resolve(data)
    })
  })
}
