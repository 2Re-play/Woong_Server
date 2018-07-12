const moment = require('moment')

exports.postImage = (connection, origin_name, file_key) => {
  return new Promise((resolve, reject) => {
    const Query = 'INSERT INTO dummy_image (origin_name, file_key, cr_date) VALUES (?,?,?)'
    connection.query(Query, [origin_name, file_key, moment().format('YYYY-MM-DD')], (err, result) => {
      err && reject(err)
      resolve(result)
    })
  })
}
