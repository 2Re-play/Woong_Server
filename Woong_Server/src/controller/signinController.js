const dbConnection = require('lib/dbConnection')
const jwt = require('lib/token')
const secretKey = require('configAll')
const signinModel = require('models/signinModel')
const Joi = require('joi')
const { respondJson, respondOnError } = require('../lib/response')


const signin_app = async (req, res) => {

  const connection = await dbConnection()
  const { email } = req.body || 'dongsu@gmail.com'
  const { password } = req.body || '1234'
  const validation_data = { email, password }
  const secret = secretKey.secretKey
  const subject = 'user_token'

  // email -> 이메일형식,string  password -> string
  const sheme = {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }

  
  try {
    // 입력 값의 유효성 확인 (not null, 유효한 형태)
    const email_password_validation = Joi.validate(validation_data, sheme)

    // 유효하지 않은 경우
    if (email_password_validation.error) {
      throw new Error(422)
    }
    // 등록된 이메일인지 확인
    const [user_info] = await signinModel.signin_validation(connection, email)   
  
    // 등록되지 않은 이메일일 경우
    if (!user_info) {
      throw new Error(203)
    }

    const { user_id } = user_info
    const db_password = user_info.password 
    
    // 입력된 비밀번호와 저장된 비밀번호 비교
    if (db_password === password) { 
      
      const payload = { user_id, email }
     
      const token = await jwt.encode(payload, subject, secret)
      // 생성된 토큰을 WP.USER 테이블에 저장
      signinModel.signin_insert(user_id, token, connection)
      
      const data = {
        token,
      }
      // 로그인 성공
      respondJson('성공적인 로그인!!', data, res, 200)
      
    } else { 
      // 패스워드가 틀렸을 경우
      throw new Error(203)
    }    
  } catch (e) {

    if (e.message === '203') { 
      respondOnError('이메일 또는 비밀번호가 일치하지 않습니다.', res, 203) 
    } else if (e.message === '422') { 
      respondOnError('형식이 맞지 않습니다.', res, 422) 
    } else {
      respondOnError('서버 내부 에러', res, 500)
    }
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
