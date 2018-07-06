exports.introduce = (connection, data) => {
  return new Promise((resolve, reject) => {
    const Query = 'SELECT market_name, market_info, title_image, farmer_image, tag_name,(SELECT count(*) FROM WP_MARKET_BOOKMARK as b WHERE b.market_id = m.market_id) as bookmark_count FROM WP_MARKET_TAG t JOIN( WP_MARKET_BOOKMARK b JOIN WP_MARKET m USING(market_id)) USING(market_id) WHERE m.market_id= ?'
    connection.query(Query, data.market_id, (err, info) => {
      err && reject(err)
      resolve(info)
      console.log(info)
    })
  })
}
