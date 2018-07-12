// 마켓의 앨범 가져오기
exports.getAlbum = (connection, data) => {
  return new Promise((resolve, reject) => {
    const Query = 'select album_id, album_title,file_key,cr_dt from WP_MARKET_ALBUM where market_id=?'
    connection.query(Query, [data.market_id], (err, result) => {
      err && reject(err)
      resolve(result)
    })
  })
}

exports.introduce = (connection, data) => {
  return new Promise((resolve, reject) => {
    const Query = `
    SELECT 
    a.market_id,
    a.market_name,
    GROUP_CONCAT(c.tag_name SEPARATOR ',') AS tag_name,
    a.delivery,
    a.quick,
    (SELECT COUNT(*) FROM WP_MARKET_BOOKMARK AS b WHERE b.market_id = a.market_id) AS bookmark_count,
    a.title_image_key,
    a.farmer_image_key,
    a.market_info,
    a.market_info AS youandi
FROM
    WP_MARKET a
INNER JOIN
    WP_MARKET_TAG c ON a.market_id = c.market_id
WHERE
    a.market_id = ${data.market_id}
GROUP BY a.market_id
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

exports.itemsorting1 = (connection, data) => {
  return new Promise((resolve, reject) => {
    const Query = `
      SELECT 
      a.market_id,b.item_id,a.market_name, b.item_name, c.file_key,
      CONCAT(item_unit,'당  ',item_price,'원') AS packaging,  a.quick, a.delivery 
      FROM 
        WP_MARKET a 
      JOIN (WP_ITEM b JOIN WP_ITEM_IMAGE c USING(item_id) )USING(market_id) 
      WHERE
       b.market_id =${data.market_id}
      ORDER BY
        b.item_name 
      ASC`
    
    connection.query(Query, (err, info) => {
      err && reject(err)
      resolve(info)
    })
  })
}
exports.itemsorting2 = (connection, data) => {
  return new Promise((resolve, reject) => {
    const Query = `
    SELECT 
        a.market_id,b.item_id,a.market_name, b.item_name,c.file_key,
        CONCAT(item_unit,'당  ',item_price,'원') AS packaging,  a.quick, a.delivery,
        (SELECT count(*) FROM WP_ITEM_FAVORITE   WHERE item_id =b.item_id) AS favorite_count 
      FROM 
        WP_MARKET a 
      JOIN 
        (WP_ITEM b JOIN WP_ITEM_IMAGE c USING(item_id))USING(market_id) 
      WHERE 
         b.market_id =${data.market_id}
      ORDER BY 
        favorite_count DESC
    `
    connection.query(Query, (err, info) => {
      err && reject(err)
      resolve(info)
    })
  })
}
exports.ulocation = (connection, data) => {
  return new Promise((resolve, reject) => {
    const Query = `
    SELECT 
    WP_USER.latitude AS user_latitude,
    WP_USER.longitude AS user_longitude,
    WP_MARKET.latitude AS market_latitude,
    WP_MARKET.longitude AS market_longitude
FROM
    WP_USER,
    WP_MARKET
WHERE
    user_id = ${data.user_id};
    `
    connection.query(Query, (err, info) => {
      err && reject(err)
      resolve(info)
    })
  })
}
exports.marketform = (connection) => {
  return new Promise((resolve, reject) => {
    const Query = `
    SELECT 
    a.market_id,
    a.market_name,
    a.market_address,
    a.title_image_key,
    GROUP_CONCAT(b.tag_name
        SEPARATOR ',') AS tag_name,
a.latitude AS youandi
    FROM
    WP_MARKET a
        JOIN
    WP_MARKET_TAG b USING (market_id)
    GROUP BY market_id;
    `
    connection.query(Query, (err, info) => {
      err && reject(err)
      resolve(info)
    })
  })
}
exports.ulomlo = (connection, data) => {
  return new Promise((resolve, reject) => {
    const Query = `
    SELECT 
    WP_USER.latitude AS user_latitude,
    WP_USER.longitude AS user_longitude,
    WP_MARKET.latitude AS market_latitude,
    WP_MARKET.longitude AS market_longitude
FROM
    WP_USER,
    WP_MARKET
WHERE
    user_id = ${data.user_id} and WP_MARKET.market_id = ${data.market_id};
    `
    connection.query(Query, (err, info) => {
      err && reject(err)
      resolve(info)
    })
  })
}
