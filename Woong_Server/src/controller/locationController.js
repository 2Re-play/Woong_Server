const post_location = (req, res) => {
  console.log('Access location post')
  res.send('ok')
}

const get_location = (req, res) => {
  console.log('Access location get')
  res.send('ok')
}

const put_location = (req, res) => {
  console.log('Access location put')
  res.send('ok')
}


module.exports = {
  post_location,
  get_location,
  put_location,
}
