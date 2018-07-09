const moment = require('moment')

// 1. 북마크 리스트
exports.getBookmark = (connection, user_id) => {
  return new Promise((resolve, reject) => {
    const Query = `select market_id,market_name,title_image 
                   from WP_MARKET 
                   where market_id 
                   in (select market_id from WP_MARKET_BOOKMARK where user_id=?)`
    connection.query(Query, [user_id], (err, result) => {
      err && reject(err)
      console.log(result)
      console.log(result.length)
      resolve(result)
    })
  })
}

// 2. 북마크 등록
exports.addBookmark = (connection, market_id, user_id) => {
  return new Promise((resolve, reject) => {
    const Query = `INSERT INTO 
                  WP_MARKET_BOOKMARK(market_id,user_id,cr_dt, cr_user) 
                  VALUES (?,?,?,?)`
    connection.query(Query, [market_id, user_id, moment().format('YYYY-MM-DD hh:mm:ss'), user_id], (err) => {
      err && reject(err)
      resolve({})
    })
  })
}

// 3. 북마크 제거
exports.deleteBookmark = (connection, market_id, user_id) => {
  return new Promise((resolve, reject) => {
    const Query = 'DELETE FROM WP_MARKET_BOOKMARK WHERE market_id=? AND user_id=?'
    connection.query(Query, [market_id, user_id], (err) => {
      err && reject(err)
      resolve({})
    })
  })
}

// 사용자 북마크 개수
exports.selectCountByBookmark = (connection, user_id, market_id) => {
  console.log('model in')
  return new Promise((resolve, reject) => {
    const Query = `
    SELECT
      count(bookmark_id) as count
    FROM
      WP_MARKET_BOOKMARK
    WHERE
      user_id = ? AND market_id = ?
    `
    connection.query(Query, [user_id, market_id], (err, result) => {
      err && reject(new Error(err))
      
      resolve(result)
    })
  })
}
