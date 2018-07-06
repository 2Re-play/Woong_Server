exports.postcart = (connection, data) => {
  return new Promise((resolve, reject) => {
    const Query = 'INSERT INTO ITEM_CART(item_idx, user_idx) VALUES (?,?)'
    console.log('models here!')
    connection.query(Query, [data.item_idx, data.user_token], (err) => {
      err && reject(err)
      resolve(data)
      console.log('finish query')
    })
  })
} 
