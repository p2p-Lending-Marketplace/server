module.exports = (err, req, res, next) => {
  let status = 500
  const messages = []

  console.log(err.message)
  if (err.name === 'ValidationError') {
    status = 422
    for (const path in err.errors) {
      messages.push(err.errors[path].message)
    }
  } else if (err.name === 'TypeError [ERR_INVALID_ARG_TYPE]') {
    status = 422
    messages.push(err.message)
  } else {
    status = err.status || status
    messages.push(err.message)
  }

  res.status(status).json({ messages })
}
