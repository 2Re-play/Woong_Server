exports.postcart = (connection, data) => {
  return new Promise((resolve, reject) => {
    const Query = 'INSERT INTO WP_ITEM_CART(item_id, user_id) VALUES (?,?)'
    connection.query(Query, [data.item_idx, data.user_token], (err) => {
      err && reject(err)
      resolve({})
    })
  })
} 
