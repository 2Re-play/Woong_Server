// 1. 북마크 리스트
exports.getBookmark = (connection, data) => {
  return new Promise((resolve, reject) => {
    const Query = 'select market_name,title_image from WP_MARKET where market_id in (select market_id from WP_MARKET_BOOKMARK where user_id=?)'
    connection.query(Query, [data.user_id], (err, result) => {
      err && reject(err)
      console.log([data.user_id])
      console.log(result)
      console.log(result.length)
      resolve(result)
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
