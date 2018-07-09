const moment = require('moment')

exports.selectFavoriteByUser = (connection, { user_id }) => {
  return new Promise((resolve, reject) => {
    const Query = `
    SELECT
      i.item_id, i.market_id, i.main_id, i.sub_id,
      m.market_name, i.item_unit, i.item_price, m.quick, m.delivery,
      S.user_id, ii.file_key,
      IF(isnull(S.user_id), 0, IF(S.user_id = 1, 1, 0)) as favorite_flag
    FROM
      WP_ITEM_FAVORITE wif
    INNER JOIN
      WP_ITEM i ON i.item_id = wif.item_id
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
      wif.user_id = ?
    `
    connection.query(Query, [user_id, user_id], (err, data) => {
      err && reject(new Error(err))
      resolve(data)
    })
  })
}

exports.insertFavoriteByUser = (connection, { user_id }, item_id) => {
  return new Promise((resolve, reject) => {
    const Query = `
    INSERT INTO
      WP_ITEM_FAVORITE (item_id, user_id, cr_dt, cr_user)
    VALUES (?, ?, ?, ?)
    `
    connection.query(Query, [item_id, user_id, moment().format('YYYY-MM-DD hh:mm:ss'), user_id], (err, data) => {
      err && reject(new Error(err))
      resolve(data)
    })
  })
}

exports.deleteFavoriteByUser = (connection, { user_id }, item_id) => {
  return new Promise((resolve, reject) => {
    const Query = `
    DELETE FROM
      WP_ITEM_FAVORITE
    WHERE
      user_id = ? AND item_id = ?
    `
    connection.query(Query, [user_id, item_id], (err, data) => {
      err && reject(new Error(err))
      resolve(data)
    })
  })
}

exports.selectCountByFavorite = (connection, { user_id }, item_id) => {
  return new Promise((resolve, reject) => {
    const Query = `
    SELECT
      count(favorite_id) as count
    FROM
      WP_ITEM_FAVORITE
    WHERE
      user_id = ? AND item_id = ?
    `
    connection.query(Query, [user_id, item_id], (err, data) => {
      err && reject(new Error(err))
      resolve(data)
    })
  })
}
