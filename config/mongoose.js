const mongoose = require('mongoose')
const URI = process.env.URI

mongoose
  .connect(URI, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('mongodb connected at', URI))
  .catch(err => console.log(err))
