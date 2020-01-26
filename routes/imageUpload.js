const image = require('express').Router()
const upload = require('../middlewares/gcsUpload')

image.post('/', upload.single('image'), (req, res) => {
  console.log(req.body)
  let imageURL = req.body.image
  console.log(imageURL)
  res.status(200).json({ imageURL })
})

module.exports = image
