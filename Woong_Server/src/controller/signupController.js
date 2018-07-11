const dbConnection = require('lib/dbConnection')
const signupModel = require('models/signupModel')
const Joi = require('joi')
const { respondJson, respondOnError } = require('../lib/response')


const signup = async (req, res) => {
  // allergy null 가능
  // use_type 0->app, 1->google, 2->facebook 
  // login_type 0-> 소비자, 1->판매자
  const connection = await dbConnection()
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
  }

  // email -> 이메일 형식 , login_type,use_type -> integer
  const sheme = {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    user_name: Joi.string().required(),
    birth: Joi.string().required(),
    phone_number: Joi.string().required(),
    login_type: Joi.number().required(),
    use_type: Joi.number().required(),
  }

  
  try {

    const signin_info_validation = Joi.validate(validation_data, sheme)

    if (signin_info_validation.error) {
      throw new Error(422)
    }

    const [duplicate_check_result] = await signupModel.duplicate_check(connection, email)

    console.log(duplicate_check_result)
    if (duplicate_check_result) {
      throw new Error(203)
    }

    const signin_result = await signupModel.post_signup(connection, email, password, user_name, birth, phone_number, login_type)
   
    const user_id = signin_result.insertId

    for (let i = 0; i < allergy.length; i += 1) {
      signupModel.post_allergy(connection, allergy[i], user_id)   
    }
    
    const data = {
      signin_result,
    }

    respondJson('성공적인 회원가입!!', data, res, 200)

  } catch (e) {

    if (e.message === '203') {
      respondOnError('중복된 이메일 입니다.', res, 203)
    } else if (e.message === '422') {
      respondOnError('형식이 맞지 않습니다.', res, 422)
    } else {
      respondOnError('서버 내부 에러', res, 500)
    }

  } finally {

    connection.release()

  }
}

// const get_allergy = async (req, res) => {

//   const connection = await dbConnection()

//   try {

//     const allergy_result = await signupModel.get_allergy(connection)
//     console.log(allergy_result)

//     const data = {
//       allergy_result,
//     }

//     respondJson('성공적인 알러지 리스트!!', data, res, 200)

//   } catch (e) {

//     respondOnError('서버 내부 에러!!', res, 500)

//   } finally {

//     connection.release()

//   }
// }


module.exports = {
  signup,
  
}
