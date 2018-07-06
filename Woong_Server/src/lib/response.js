const respondJson = (message, obj, res, status) => {

  res
    .status(status)
    .json({
      message,
      data: obj,
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
