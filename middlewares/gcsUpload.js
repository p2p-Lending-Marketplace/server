const Unggah = require('unggah')
const keyFile = process.env.GCP_KEYFILE_PATH
const bucket = process.env.GOOGLE_BUCKET_NAME

const storage = Unggah.gcs({
  keyFilename: keyFile,
  bucketName: bucket,
})

module.exports = new Unggah({
  storage, // storage configuration for google cloud storage or S3
})
