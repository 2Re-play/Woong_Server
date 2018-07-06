const mysql = require('mysql')
const config = require('./config/dbConfig')

let DBpool = ''
const __getPool = () => {
  if (!DBpool) {
    DBpool = mysql.createPool(config)
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
