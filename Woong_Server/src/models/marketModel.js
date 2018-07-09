// 마켓의 앨범 가져오기
exports.getAlbum = (connection, data) => {
  return new Promise((resolve, reject) => {
    const Query = 'select album_id, album_title,album_url,cr_dt from WP_MARKET_ALBUM where market_id=?'
    connection.query(Query, [data.market_id], (err, result) => {
      err && reject(err)
      resolve(result)
    })
  })
}

exports.introduce = (connection, data) => {
  return new Promise((resolve, reject) => {
    const Query = `
    SELECT DISTINCT
        market_name, market_info, title_image_key, farmer_image_key, (SELECT GROUP_CONCAT( tag_name SEPARATOR ',') FROM WP_MARKET_TAG WHERE m.market_id =${data.market_id}) AS tag_name ,
        (SELECT count(*) FROM WP_MARKET_BOOKMARK as b WHERE b.market_id = m.market_id) as bookmark_count 
    FROM 
        WP_MARKET_TAG t 
    JOIN
        ( WP_MARKET_BOOKMARK b JOIN WP_MARKET m USING(market_id)) USING(market_id) 
    WHERE 
        m.market_id=${data.market_id};
    `
    connection.query(Query, (err, info) => {
      err && reject(err)
      resolve(info)
    })
  })
}

exports.itemdetail = (connection, data) => {
  return new Promise((resolve, reject) => {
    const Query = `
    SELECT 
        d.market_name,c.file_key, a.item_name, a.item_info, a.item_cook, a.item_maintain,
        CONCAT( a.item_name,' ',a.item_unit) AS packaging, b.item_manufacture, b.item_expiration, b.item_related, b.item_producer
    FROM 
        WP_ITEM_DETAIL b 
    JOIN( (WP_ITEM AS a JOIN WP_MARKET AS d USING(market_id))JOIN WP_ITEM_IMAGE AS c USING(item_id) ) USING(item_id) 
    WHERE 
        a.item_id = ${data.item_id} AND d.market_id = ${data.market_id}`
    connection.query(Query, (err, info) => {
      err && reject(err)
      resolve(info)
    })
  })
}

exports.itemsorting = (connection, data) => {
  return new Promise((resolve, reject) => {
    let Query
    if (data.option === 'name') {
      Query = `
      SELECT 
      a.market_id,b.item_id,a.market_name, b.item_name, c.file_key,
      CONCAT(item_unit,'당  ',item_price) AS packaging,  a.quick, a.delivery 
      FROM 
        WP_MARKET a 
      JOIN (WP_ITEM b JOIN WP_ITEM_IMAGE c USING(item_id) )USING(market_id) 
      WHERE
        a.market_id = b.market_id =1
      ORDER BY
        b.item_name 
      ASC`
    } else if (data.option === 'best') {
      Query = `
      SELECT 
        a.market_id,b.item_id,a.market_name, b.item_name,c.file_key,
        CONCAT(item_unit,'당  ',item_price) AS packaging,  a.quick, a.delivery,
        (SELECT count(*) FROM WP_ITEM_FAVORITE   WHERE item_id =b.item_id) AS favorite_count 
      FROM 
        WP_MARKET a 
      JOIN 
        (WP_ITEM b JOIN WP_ITEM_IMAGE c USING(item_id))USING(market_id) 
      WHERE 
        a.market_id = b.market_id =${data.market_id} 
      ORDER BY 
        favorite_count DESC
      `
    }
    connection.query(Query, (err, info) => {
      err && reject(err)
      resolve(info)
    })
  })
}
