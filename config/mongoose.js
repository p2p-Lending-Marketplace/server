const mongoose = require('mongoose')
const URI =
  process.env.URI || 'mongodb://localhost:27017/p2p-lending-marketplace-dev'

mongoose
  .connect(URI, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('mongodb connected at', URI))
  .catch(err => console.log(err))
