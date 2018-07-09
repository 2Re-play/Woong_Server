const R = 6371 // km

const getdistance = async (userLatitude, userLongitude, lat2, lon2) => {
  const dLat = (lat2 - userLatitude) * Math.PI / 180
  const dLon = (lon2 - userLongitude) * Math.PI / 180 
  let c

  const a = await new Promise(async (resolve, reject) => {
    (err, result) => {
      Math.sin(dLat / 2) * Math.sin(dLat / 2)
            + Math.cos(userLatitude * Math.PI / 180) 
              * Math.cos(lat2 * Math.PI / 180) 
              * Math.sin(dLon / 2) * Math.sin(dLon / 2) 
      c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) 
      if (err) reject(err)
      resolve(result)
    }
  })
  return R * c
}

module.exports = {
  getdistance,
}
