const mysql = require('promise-mysql')
const { dbConfig } = require('../confingAll')

let DBpool = ''
const __getPool = () => {
  if (!DBpool) {
    DBpool = mysql.createPool(dbConfig)
    return DBpool
  }
  return DBpool
}

module.exports = function DBConnection() {
  return new Promise((resolve, reject) => {
    const pool = __getPool()
    pool.getConnection((err, connection) => {
      err && reject(err)
      resolve(connection)
    })
  })
}
