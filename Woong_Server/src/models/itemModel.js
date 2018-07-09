exports.selectItemByKeyword = (connection, { user_id }, keyword) => {
  return new Promise((resolve, reject) => {
    const Query = `
    SELECT
      i.item_id, i.market_id, i.main_id, i.sub_id,
      i.item_name,
      m.market_name, i.item_unit, i.item_price, m.quick, m.delivery,
      S.user_id, ii.file_key,
      IF(isnull(S.user_id), 0, IF(S.user_id = ?, 1, 0)) as favorite_flag
    FROM
      WP_ITEM i
    INNER JOIN
      WP_ITEM_IMAGE ii ON ii.item_id = i.item_id
    INNER JOIN
      WP_MARKET m ON i.market_id = m.market_id
    LEFT JOIN (
        SELECT
          user_id, item_id
        FROM
          WP_ITEM_FAVORITE wif
        WHERE wif.user_id = ?
      ) as S ON i.item_id = S.item_id
    WHERE
      i.item_name like '%${keyword}%'
    Group by i.item_id
    `
    connection.query(Query, [user_id, user_id], (err, data) => {
      err && reject(new Error(err))
      resolve(data)
    })
  })
}
