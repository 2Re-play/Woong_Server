exports.getWeeklyFarmer = (connection) => {
  return new Promise((resolve, reject) => {
    const Query = 'SELECT * FROM WEEKLY_FARMER'
    connection.query(Query, (err, data) => {
      err && reject(err)
      resolve(data)
    })
  })
}
