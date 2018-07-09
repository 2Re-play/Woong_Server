const dbConnection = require('lib/dbConnection')
const jwt = require('lib/token')
const secretKey = require('confingAll')
const signinModel = require('models/signinModel')
const Joi = require('joi')


const signin_app = async (req, res) => {

  const email = req.body.email || 'dongsu@gmail.com'
  const password = req.body.password || '1234'
  
  const secret = secretKey.secretKey
  const subject = 'user_token'

  const id_validation = Joi.validate(email, Joi.string().email().required())
  const pw_validation = Joi.validate(password, Joi.string().required())

  console.log(id_validation)
  console.log(pw_validation)

  if (id_validation.error) {
    throw new Error(id_validation.error)
  } else if (pw_validation.error) {
    throw new Error(pw_validation.error)
  }

  const connection = await dbConnection()
  
  try {
    
    const [user_info] = signinModel.signin_validation(connection, email)
      
    if (!user_info) {
      throw new Error('Internal Error')
    }
    console.log(user_info)

    const user_id = user_info.user_id
    const db_password = user_info.password 

    console.log(user_id) 
    console.log(db_password)


    if (user_id && db_password === password) { //  user_id가 db에 존재하고 비빌번호도 일치한다면
      console.log('인증 성공')
      const payload = { user_id, email }
      const token = await jwt.encode(payload, subject, secret)
    
      console.log(token)
      const insert = await signinModel.signin_insert(user_id, token, connection)
      console.log(insert)
      const data = {
        token,
      }
      res.status(200)
      res.send({ data })
      
    }
    
    
  } catch (e) {
    res.status(600)
    res.send(e)
  } 
  connection.release()
  

}

const signin_sns = (req, res) => {
  console.log('Access sns login')
  res.send('ok')
}


module.exports = {
  signin_app,
  signin_sns,
}
