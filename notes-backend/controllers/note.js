const Note = require('../models/note')
const User = require('../models/user')
const jwt = require('jsonwebtoken');
const notesRouter = require('express').Router()


notesRouter.get('/', async (req, res) => {
  const notes = await Note.find({})
    .populate('user', { username: 1, name: 1 })
  res.json(notes)
})

notesRouter.get('/:id', async (req, res) => {
  const note = await Note.findById(req.params.id)
  if (note) {
    res.json(note)
  } else {
    res.status(404).end()
  }
})

notesRouter.delete('/:id', async (req, res) => {
  await Note.findByIdAndRemove(req.params.id)
  res.status(204).end() // 204: no content
})

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

notesRouter.post('/', async (req, res) => {
  const body = req.body
  const token = getTokenFrom(req)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const note = new Note({
    content: body.content,
    date: new Date(),
    important: body.important || false,
    user: user._id
  })

  const saved_note = await note.save()

  user.notes = user.notes.concat(saved_note._id)
  await user.save()

  res.status(201).json(saved_note)
})


notesRouter.put('/:id', async (req, res) => {
  const { content, important } = req.body

  const updated_note = await Note.findByIdAndUpdate(
    req.params.id,
    { content, important },
    { new: true, runValidators: true, context: 'query' }
  )

  res.json(updated_note)
})

module.exports = notesRouter
