const _ = require('lodash')

const respondJson = (message, obj, res, status) => {

  res
    .status(status)
    .json({
      message,
      data: _.isEmpty(obj) ? {} : obj,
    })
  
}

const respondOnError = (message, res, status) => {
  
  res
    .status(status)
    .json({
      message,
    })
  
}
  
module.exports = {  
  respondJson,
  respondOnError,
}
