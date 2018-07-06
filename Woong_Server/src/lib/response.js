const respondJson = (res, code, obj, status) => {
  if (status) {
    res
      .status(status)
      .json({
        code,
        data: obj,
      })
  } else { 
    res.json({
      code,
      data: obj,
    })
  }
}

const respondOnError = (res, code, obj, status) => {
  if (status) {
    res
      .status(status)
      .json({
        code,
        data: obj,
      })
  } else {
    res.json({
      code,
      data: obj,
    })
  }
}

module.exports = {
  respondJson,
  respondOnError,
}
