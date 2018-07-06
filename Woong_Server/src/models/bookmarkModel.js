// 1. 북마크 리스트
exports.getBookmark = (connection) => {
  return new Promise((resolve, reject) => {
    const Query = 'SELECT * FROM MARKET_BOOKMARK'
    connection.query(Query, (err, data) => {
      err && reject(err)
      resolve(data)
    })
  })
}

// 2. 북마크 등록
exports.addBookmark = (connection, data) => {
  return new Promise((resolve, reject) => {
    const Query = 'INSERT INTO WP_MARKET_BOOKMARK(market_id,user_id) VALUES (?,?)'
    connection.query(Query, [data.market_id, data.user_token], (err) => {
      err && reject(err)
      resolve({})
    })
  })
}

// 3. 북마크 제거
exports.deleteBookmark = (connection, data) => {
  return new Promise((resolve, reject) => {
    const Query = 'DELETE FROM WP_MARKET_BOOKMARK WHERE market_id=?'
    connection.query(Query, [data.market_id], (err) => {
      err && reject(err)
      resolve({})
    })
  })
}
