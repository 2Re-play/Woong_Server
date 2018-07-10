const dbConnection = require('lib/dbConnection')
const jwt = require('lib/token')
const secretKey = require('configAll')
const signinModel = require('models/signinModel')
const Joi = require('joi')
const { respondJson, respondOnError } = require('../lib/response')


const signin_app = async (req, res) => {

  const { email } = req.body || 'dongsu@gmail.com'
  const { password } = req.body || '1234'
  
  console.log(req.body)
  console.log(email)
  console.log(password)

  const validation_data = { email, password }
  const secret = secretKey.secretKey
  const subject = 'user_token'

  const sheme = {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }

  const email_password_validation = Joi.validate(validation_data, sheme)
  console.log(email_password_validation)

  // 잘못된 형식의 이메일,비밀번호가 들어왔을 경우
  if (email_password_validation.error) {
    respondOnError('이메일 형식이 아닙니다.', res, 400)
  }

  const connection = await dbConnection()
  try {
    
    const [user_info] = await signinModel.signin_validation(connection, email)   
    console.log(user_info)
    // 등록되지 않은 이메일
    if (!user_info) {
      respondOnError('등록되지 않은 이메일 입니다.', res, 400)
    }

    const { user_id } = user_info
    const db_password = user_info.password 

    console.log(user_id) 
    console.log(db_password)

    if (db_password === password) { //  user_id가 db에 존재하고 비빌번호도 일치한다면

      const payload = { user_id, email }
      const token = await jwt.encode(payload, subject, secret)
    
      console.log(token)
      const insert = await signinModel.signin_insert(user_id, token, connection)
      
      console.log(insert)
      const data = {
        token,
      }
      // 로그인 성공
      respondJson('성공적인 로그인!!', data, res, 200)
      
    } else { // 패스워드가 틀렸을 경우
      respondOnError('잘못된 패스워드!!', res, 400)
    }
        
  } catch (e) { // 서버 내부 에러
    respondOnError('서버 내부 에러', res, 500)
  } finally {
    connection.release()
  }

}

const signin_sns = (req, res) => {
  console.log('Access sns login')
  res.send('ok')
}


module.exports = {
  signin_app,
  signin_sns,
}
