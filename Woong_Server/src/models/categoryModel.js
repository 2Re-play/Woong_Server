exports.selectSubListByMain = (connection, { main_id }) => {
  return new Promise((resolve, reject) => {
    const Query = `
    SELECT
      *
    FROM
      CATEGORY_SUB
    WHERE
      main_category_idx = ?
    `
    connection.query(Query, [main_id], (err, data) => {
      err && reject(err)
      resolve(data)
    })
  })
}
