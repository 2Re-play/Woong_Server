const moment = require('moment')

// 1. 북마크 리스트
exports.getBookmark = (connection, data) => {
  return new Promise((resolve, reject) => {
    const Query = `select market_id,market_name,title_image 
                   from WP_MARKET 
                   where market_id in (select market_id from WP_MARKET_BOOKMARK where user_id=?)`
    connection.query(Query, [data.user_token], (err, result) => {
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
    const Query = `INSERT INTO 
                  WP_MARKET_BOOKMARK(market_id,user_id,cr_dt, cr_user) 
                  VALUES (?,?,?,?)`
    connection.query(Query, [data.market_id, data.user_token, moment().format('YYYY-MM-DD hh:mm:ss'), data.user_token], (err) => {
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

// 사용자 북마크 개수
exports.selectCountByBookmark = (connection, data) => {
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
    connection.query(Query, [data.user_token, data.market_id], (err, result) => {
      err && reject(new Error(err))
      
      resolve(result)
    })
  })
}
