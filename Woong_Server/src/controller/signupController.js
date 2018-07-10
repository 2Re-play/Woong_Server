const dbConnection = require('lib/dbConnection')
const signupModel = require('models/signupModel')
const Joi = require('joi')
const { respondJson, respondOnError } = require('../lib/response')


const signup = async (req, res) => {

  const { email } = req.body
  const { password } = req.body
  const { user_name } = req.body
  const { birth } = req.body
  const { phone_number } = req.body
  const { login_type } = req.body
  const { use_type } = req.body
  const { allergy } = req.body


  const validation_data = {
    email, 
    password, 
    user_name, 
    birth, 
    phone_number, 
    login_type,
    use_type,
    allergy,
  }

  const sheme = {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    user_name: Joi.string().required(),
    birth: Joi.string().required(),
    phone_number: Joi.string().required(),
    login_type: Joi.number().required(),
    use_type: Joi.number().required(),
    allergy: Joi.array().required(),
  }

  const signin_info_validation = Joi.validate(validation_data, sheme)

  if (signin_info_validation.error) {
    respondOnError('회원 정보 형식이 안맞습니다.', res, 400)
    connection.release()
    return 
  }

  const connection = await dbConnection()

  try {
    const [duplicate_check_result] = await signupModel.duplicate_check(connection, email)

    console.log(duplicate_check_result)
    if (duplicate_check_result) {
      respondOnError('아이디가 중복되었습니다.', res, 400)
      connection.release()
      return 
    }

    const signin_result = await signupModel.put_signout(connection, email, password, user_name, birth, phone_number, login_type)
    // console.log(signin_result)

    const data = {
      signin_result,
    }

    respondJson('성공적인 회원가입!!', data, res, 200)

  } catch (e) {
    respondOnError('서버 내부 에러!!', res, 500)
  } finally {
    connection.release()
  }
}

const get_allergy = async (req, res) => {

  const connection = await dbConnection()

  try {
    const allergy_result = await signupModel.get_allergy(connection)
    console.log(allergy_result)

    const data = {
      allergy_result,
    }

    respondJson('성공적인 알러지 리스트!!', data, res, 200)

  } catch (e) {
    respondOnError('서버 내부 에러!!', res, 500)
  } finally {
    connection.release()
  }
}


module.exports = {
  signup,
  get_allergy,
}
