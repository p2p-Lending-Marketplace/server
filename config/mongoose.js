const mongoose = require('mongoose')
const URI =
  process.env.NODE_ENV !== 'production'
    ? `mongodb://localhost/p2p-lending-marketplace-${process.env.NODE_ENV}`
    : process.env.URI

mongoose
  .connect(URI, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('mongodb connected at', URI))
  .catch(err => console.log(err))
