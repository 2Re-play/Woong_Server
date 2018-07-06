exports.getBookmark = (connection) => {
  return new Promise((resolve, reject) => {
    const Query = 'SELECT * FROM MARKET_BOOKMARK'
    connection.query(Query, (err, data) => {
      err && reject(err)
      resolve(data)
    })
  })
}

exports.addBookmark = (connection, market_idx, user_idx) => {
  return new Promise((resolve, reject) => {
    let market_bookmark_idx
    const Query = 'INSERT INTO MARKET_BOOKMARK(market_bookmark_idx,market_idx,user_idx) VALUES (?,?)'
    connection.query((Query, [market_bookmark_idx, market_idx, user_idx]))
  })
}
