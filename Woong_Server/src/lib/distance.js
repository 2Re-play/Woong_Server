
const R = 6371 // km

const distance = (userLatitude, userLongitude, lat2, lon2) => {
  const dLat = (lat2 - userLatitude) * Math.PI / 180
  const dLon = (lon2 - userLongitude) * Math.PI / 180 
    
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
            + Math.cos(userLatitude * Math.PI / 180) 
              * Math.cos(lat2 * Math.PI / 180) 
              * Math.sin(dLon / 2) * Math.sin(dLon / 2) 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) 
  return R * c
}

module.exports = {
  distance,
}
