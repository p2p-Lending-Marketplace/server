module.exports = (err, req, res, next) => {
  let status = 500
  const messages = []

  console.log(err)
  if (err.name === 'ValidationError') {
    status = 422
    for (const path in err.errors) {
      messages.push(err.errors[path].message)
    }
  } else {
    status = err.status || status
    messages.push(err.message)
  }

  res.status(status).json({ messages })
}
