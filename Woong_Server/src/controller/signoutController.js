const dbconnection = require('lib/dbConnection')
const signoutModel = require('models/signoutModel')
const Joi = require('joi')
const { respondJson, respondOnError } = require('../lib/response')


const signout = async (req, res) => {
  
  const connection = await dbconnection()  
  const { user_id } = req.user
  
  try {

    const user_id_validation = Joi.validate(user_id, Joi.number().required())
    
    if (user_id_validation.error) {
      throw new Error(403)
    }

    const signout_result = await signoutModel.put_signout(connection, user_id)
    console.log(signout_result)
    
    if (signout_result.changedRows === 0) {
      throw new Error(401)
    }

    const data = {
      signout_result,
    }

    respondJson('성공적인 로그아웃!!', data, res, 200)

  } catch (e) {

    if (e.message === '401') {
      respondOnError('이미 로그아웃 하였습니다.', res, 401)
    } else if (e.message === '403') {
      respondOnError('형식이 맞지 않습니다.', res, 403)
    } else {
      respondOnError('서버 내부 에러', res, 500)
    }

  } finally {
    connection.release()
  }

}


module.exports = {
  signout,
}
