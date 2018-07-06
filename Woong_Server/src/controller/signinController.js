const signin_app = (req, res) => {
  console.log('Access app login')
  res.send('ok')
}

const signin_sns = (req, res) => {
  console.log('Access sns login')
  res.send('ok')
}


module.exports = {
  signin_app,
  signin_sns,
}
