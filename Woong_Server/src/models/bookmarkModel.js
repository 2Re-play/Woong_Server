exports.getBookmark = (connection) => {
  return new Promise((resolve, reject) => {
    const Query = 'SELECT * FROM MARKET_BOOKMARK'
    connection.query(Query, (err, data) => {
      err && reject(err)
      resolve(data)
    })
  })
}