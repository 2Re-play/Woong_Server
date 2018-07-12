exports.selectSubListByMain = (connection, main_id) => {
  return new Promise((resolve, reject) => {
    const Query = `
    SELECT
      main_id, sub_id, sub_name
    FROM
      WP_CATEGORY_SUB
    WHERE
      main_id = ?
    `
    connection.query(Query, [main_id], (err, data) => {
      err && reject(new Error(err))
      resolve(data)
    })
  })
}

exports.selectItemByMarket = (connection, { main_id, sub_id }, { user_id }) => {
  return new Promise((resolve, reject) => {
    const Query = `
    SELECT
      i.item_id, i.market_id, i.main_id, i.sub_id, i.item_name,
      m.market_name, i.item_unit, i.item_price, m.quick, m.delivery,
      S.user_id, ii.file_key,
      IF(isnull(S.user_id), 0, IF(S.user_id = ${user_id}, 1, 0)) as favorite_flag
    FROM
      WP_ITEM i
    INNER JOIN
      WP_ITEM_IMAGE ii ON ii.item_id = i.item_id
    INNER JOIN
      WP_CATEGORY_MAIN cm ON i.main_id = cm.main_id
    INNER JOIN
      WP_CATEGORY_SUB cs ON i.sub_id = cs.sub_id
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
      i.main_id = ? AND i.sub_id = ?
    `
    connection.query(Query, [user_id, main_id, sub_id], (err, data) => {
      err && reject(new Error(err))
      resolve(data)
    })
  })
}
