const aws = require('aws-sdk')
const dbConnection = require('lib/dbConnection')
const dummyImageData = require('../models/dummyImageModel')

aws.config.loadFromPath('./config/credentials.json')

exports.postDummyImage = async (req, res) => {
  const connection = await dbConnection()
  let postDummyImageResult

  const { name } = req.body

  try {
    for (const i in req.files) {
      const imageData = req.files[i].transforms[0]
      console.log(imageData)
      postDummyImageResult = await dummyImageData.postImage(connection, 'item_'+req.files[i].originalname, imageData.key)
    }
  
    res.status(200).send({
      message: 'success',
      result: postDummyImageResult,
    })

  } catch (e) {
    console.log(e)
  } finally {
    connection.release()
  }
}
