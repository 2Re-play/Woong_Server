// 장바구니 등록
exports.postcart = (connection, data) => {
  return new Promise((resolve, reject) => {
    const Query = ` 
    INSERT INTO 
      WP_ITEM_CART(item_id, user_id) 
    VALUES (${data.item_id},${data.user_token}) `
    connection.query(Query, (err) => {
      err && reject(err)
      resolve({})
    })
  })
} 
// 장바구니 해제 
exports.deletecart = (connection, data) => {
  return new Promise((resolve, reject) => {
    const Query = `
    DELETE FROM
      WP_ITEM_CART 
    WHERE 
      user_id =${data.user_token} AND item_id = ${data.item_id}
    `
    connection.query(Query, (err) => {
      err && reject(err)
      resolve({})
    })
  })
} 
// 장바구니 목록 가져오기
exports.getcart = (connection, data) => {
  return new Promise((resolve, reject) => {
    const Query = `
    `
    connection.query(Query, [data.item_idx, data.user_token], (err) => {
      err && reject(err)
      resolve({})
    })
  })
} 
