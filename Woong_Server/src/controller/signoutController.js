const dbconnection = require('lib/dbConnection')
const signoutModel = require('models/signoutModel')
const { respondJson, respondOnError } = require('../lib/response')


const signout = async (req, res) => {
  
  const { user_id } = req.user
  // console.log(user_id)
  const connection = await dbconnection()  

  try {
    const signout_result = await signoutModel.put_signout(connection, user_id)
    console.log(signout_result)
    
    if (signout_result.changedRows === 0) {
      respondOnError('이미 로그아웃 하였습니다.', res, 500)
    }

    const data = {
      signout_result,
    }

    respondJson('성공적인 로그아웃!!', data, res, 200)
  } catch (e) {
    respondOnError('서버 내부 에러', res, 500)
  } finally {
    connection.release()
  }

}


module.exports = {
  signout,
}
