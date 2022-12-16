const Note = require('../models/note')
const notesRouter = require('express').Router()

notesRouter.get('/', async (req, res) => {
  const notes = await Note.find({})
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

notesRouter.delete('/:id', async (req, res, next) => {
  try {
    const _ = await Note.findByIdAndRemove(req.params.id)
    res.status(204).end() // 204: no content
  } catch (error) {
    naxt(error)
  }
})

notesRouter.post('/', async (req, res) => {
  const body = req.body

  const note = new Note({
    content: body.content,
    date: new Date(),
    important: body.important || false
  })

  const saved_note = await note.save()
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
