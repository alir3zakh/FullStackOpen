const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })
  const passrodMatch = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!passrodMatch) {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }

  const signiture = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(signiture, process.env.SECRET)
  res.status(200).send({
    token, username, name: user.name
  })
})


module.exports = loginRouter
