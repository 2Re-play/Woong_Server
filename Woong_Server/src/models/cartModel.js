// 장바구니 등록
exports.postcart = (connection, data) => {
  return new Promise((resolve, reject) => {
    const Query = ` 
    INSERT INTO 
      WP_ITEM_CART(item_id, user_id) 
    VALUES (${data.item_id},${data.user_id}) `
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
      user_id =${data.user_id} AND item_id = ${data.item_id}
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
    SELECT 
c.market_id, b.item_id,
      CONCAT('[',c.market_name,'] ',b.item_name) AS carttitle ,d.file_key,
      CONCAT(b.item_price,'원(',b.item_unit,')') AS packging,b.item_price, b.item_unit, c.delivery 
    FROM 
      WP_ITEM_CART a 
    JOIN(( WP_ITEM b JOIN WP_MARKET c USING(market_id)) JOIN WP_ITEM_IMAGE d USING(item_id)) USING(item_id) 
    WHERE 
      a.user_id =${data.user_id};
    `
    connection.query(Query, (err, info) => {
      err && reject(err)
      resolve(info)
    })
  })
} 
