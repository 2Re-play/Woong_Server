const aws = require('aws-sdk')

aws.config.loadFromPath('./config/credentials.json')
const s3 = new aws.S3()

const getSignedUrl = async (key) => {
  const options = {
    Bucket: 'uniquegamza',
    Expires: 300,
    Key: key,
    ResponseContentDisposition: null,
  }
  const result2 = await new Promise(async (resolve, reject) => {
    s3.getSignedUrl('getObject', options, (err, result) => {
      if (err) reject(err)
      resolve(result)
    })
  })
  
  return result2
}

module.exports = {
  getSignedUrl,
}
