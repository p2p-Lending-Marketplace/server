module.exports = (err, req, res, next) => {
  let status = 500
  const messages = []

  if (err.status === 'ValidationError') {
    status = 422
    for (const path in err.errors) {
      messages.push(err.errors[path].message)
    }
  }

  res.status(status).json({ messages })
}
