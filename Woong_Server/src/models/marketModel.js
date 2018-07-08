exports.introduce = (connection, data) => {
  return new Promise((resolve, reject) => {
    const Query = 'SELECT market_name, market_info, title_image, farmer_image, tag_name,(SELECT count(*) FROM WP_MARKET_BOOKMARK as b WHERE b.market_id = m.market_id) as bookmark_count FROM WP_MARKET_TAG t JOIN( WP_MARKET_BOOKMARK b JOIN WP_MARKET m USING(market_id)) USING(market_id) WHERE m.market_id= ?'
    connection.query(Query, data.market_id, (err, info) => {
      err && reject(err)
      resolve(info)
    })
  })
}

exports.itemdetail = (connection, data) => {
  return new Promise((resolve, reject) => {
    const Query = `SELECT d.market_name,c.file_key, a.item_name, a.item_info, a.item_cook, a.item_maintain,
    CONCAT( a.item_name,' ',a.item_unit) AS packaging, b.item_manufacture, b.item_expiration, b.item_related, b.item_producer
    FROM WP_ITEM_DETAIL b JOIN( (WP_ITEM AS a JOIN WP_MARKET AS d USING(market_id))JOIN WP_ITEM_IMAGE AS c USING(item_id) ) USING(item_id) 
    WHERE a.item_id = ${data.item_id} AND d.market_id = ${data.market_id};`
    connection.query(Query, (err, info) => {
      err && reject(err)
      resolve(info)
    })
  })
}
