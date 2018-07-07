const moment = require('moment')

/** *** 후기 (리뷰) 작성하기 **** */

// 리뷰 글 작성
exports.postReview = (body, market_idx, connection) => {
  return new Promise((resolve, reject) => {
    const Query = 'INSERT INTO MARKET_REVIEW (market_review_idx,user_idx,market_idx,content,date,rate_speed,rate_fresh,rate_taste,rate_kindness) VALUES (?,?,?,?,?,?,?,?,?)'
    connection.query(Query, [1, Number(body.user_idx), Number(body.market_idx), body.content, moment().format('YYYY-MM-DD'), Number(body.rate_speed), Number(body.rate_fresh), Number(body.rate_taste), Number(body.rate_kindness)], (err, result) => {
      err && reject(err)
      resolve(result)
    })
  })
}
// 리뷰 글 작성 시 사진 업로드
exports.postReviewImages = (body, file, review_album_idx, review_idx, connection) => {
  return new Promise((resolve, reject) => {
    let insert
    const Query = 'INSERT INTO REVIEW_ALBUM (review_album_idx,image,review_idx) VALUES (?,?,?)'
    // 이미지 파일이 없을 때
    if (!file) {
      insert = [review_album_idx[0].review_album_idx, null, body.review_idx]
    } else {
      insert = [review_album_idx[0].review_album_idx, file.location, body.review_idx]
    }

    connection.query(Query, insert, (err, result) => {
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
    const Query = 'select * from WP_REVIEW_IMAGE where review_id IN (select review_id from WP_MARKET_REVIEW where market_id=?)'
    connection.query(Query, [data.market_id], (err, result) => {
      err && reject(err)
      resolve(result)
    })
  })
}

// 3. 리뷰 페이지 하단의 사용자들의 후기 가져오기 (사용자 이름, 후기 글만 가져옴)
exports.getReviewContent = (connection, data) => {
  return new Promise((resolve, reject) => {
    const Query = 'select user_id,content from WP_MARKET_REVIEW where market_id=?'
    connection.query(Query, [data.market_id], (err, result) => {
      err && reject(err)
      resolve(result)
    })
  })
}
