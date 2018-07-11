const moment = require('moment')

/** *** 후기 (리뷰) 작성하기 **** */

// 1. 리뷰 글 작성
exports.postReview = (connection, data) => {
  return new Promise((resolve, reject) => {
    const Query = `INSERT INTO 
                  WP_MARKET_REVIEW (user_id,market_id,content,date,rate_speed,rate_fresh,rate_taste,rate_kindness,cr_dt,cr_user)
                  VALUES (?,?,?,?,?,?,?,?,?,?)`
    connection.query(Query, [data.user_id, Number(data.market_id), data.content, moment().format('YYYY-MM-DD'), Number(data.rate_speed), Number(data.rate_fresh), Number(data.rate_taste), Number(data.rate_kindness), moment().format('YYYY-MM-DD'), data.user_id], (err, result) => {
      err && reject(err)
      resolve(result)
    })
  })
}


// 2. 리뷰 이미지 테이블에 이미지 저장
exports.saveImage = (connection, review_id, file_key, file_size, file_name_origin, cr_user, file_url) => {
  return new Promise((resolve, reject) => {
    const Query = `INSERT INTO
                   WP_REVIEW_IMAGE (review_id,file_key,file_size,file_name_origin,cr_dt,cr_user, file_url)
                   VALUES(?,?,?,?,?,?,?)`
    connection.query(Query, [review_id, file_key, file_size, file_name_origin, moment().format('YYYY-MM-DD'), cr_user, file_url], (err, result) => {
      err && reject(err)
      resolve(result)
    })
  })
}


/** *** 특정 마켓의 후기 가져오기 **** */

// 1. 리뷰 별점 가져오기
exports.getReviewRate = (connection, data) => {
  return new Promise((resolve, reject) => {
    const Query = 'select rate_speed,rate_taste,rate_fresh,rate_kindness from WP_MARKET where market_id=?'
    connection.query(Query, [data.market_id], (err, result) => {
      err && reject(err)
      resolve(result)
    })
  })
}

// 2. 리뷰의 사진들 가져오기 (리뷰에 올라가 있는 모든 사진을 가져옴)
exports.getReviewImages = (connection, data) => {
  return new Promise((resolve, reject) => {
    const Query = `select file_key
                   from WP_REVIEW_IMAGE
                   where review_id in
                   (select review_id from WP_MARKET_REVIEW where market_id=?)`
    connection.query(Query, [data.market_id], (err, result) => {
      err && reject(err)
      resolve(result)
    })
  })
}

// 3. 리뷰 페이지 하단의 사용자들의 후기 가져오기 (사용자 이름, 후기 글만 가져옴)
exports.getReviewContent = (connection, data) => {
  return new Promise((resolve, reject) => {
    const Query = `SELECT 
                   a.user_name, b.content 
                   FROM 
                   WP_MARKET_REVIEW b , WP_USER a
                   WHERE
                    b.market_id=? AND b.user_id=a.user_id`
    connection.query(Query, [data.market_id], (err, result) => {
      err && reject(err)
      resolve(result)
    })
  })
}
