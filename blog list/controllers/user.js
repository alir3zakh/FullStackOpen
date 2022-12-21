const User = require('../models/user')
const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')

usersRouter.get('/', async (req, res) => {
  const users = await User.find({})
    .populate('blogs', { url: 1, title: 1, author: 1 })
  res.json(users)
})

usersRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body

  if (!(username && password)) {
    return res.status(400).json({
      error: 'username & password must not be missing'
    })
  } else if (password.length < 3 || username.length < 3) {
    return res.status(400).json({
      error: 'minimum password & username length is 3'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return res.status(400).json({
      error: 'username must be unique'
    })
  }

  const user = new User({
    username, name, passwordHash
  })

  const savedUser = await user.save()
  res.status(201).json(savedUser)
})

module.exports = usersRouter
