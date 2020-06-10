module.exports = ({
  env
}) => ({
  email: {
    provider: "nodemailer-v3",
    providerOptions: {},
    settings: {
      host: 'smtp.example.com',
      port: 587,
      username: 'eifpztkwrcvxnqhqkj@awdrt.net',
      password: 'password',
      secure: false
    }
  }
})
