const moment = require('moment')
// market_review_idx 오토 뭐시기로 바꿔야함
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
