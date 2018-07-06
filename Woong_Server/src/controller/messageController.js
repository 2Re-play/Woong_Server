const get_message = (req, res) => {
  console.log('Access get message')
  res.send('ok')
}

const post_message = (req, res) => {
  console.log('Access post message')
  res.send('ok')
}


module.exports = {
  get_message,
  post_message,
}
