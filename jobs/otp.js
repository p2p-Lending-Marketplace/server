const Bull = require('bull')

const otpQueue = new Bull('otp-queue')

otpQueue.process(async job => {
  const accountSid = process.env.OTP_SID
  const authToken = process.env.OTP_AUTH_TOKEN
  const otpPhoneNumber = process.env.OTP_PHONE_NUMBER

  const client = require('twilio')(accountSid, authToken)

  const { phoneNumber, token } = job.data

  const message = await client.messages.create({
    body: `This is your otp token. Please don't share it to anyone.\n${token}`,
    from: otpPhoneNumber,
    to: phoneNumber,
  })
})
