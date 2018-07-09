const mysql = require('promise-mysql')
<<<<<<< HEAD
const { dbConfig } = require('configAll')
=======
const { dbConfig } = require('../confingAll')
>>>>>>> d310f288f2eeba44e7cd4707e3f1e632cfcf25cd

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
