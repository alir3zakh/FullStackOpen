const Note = require('../models/note')
const notesRouter = require('express').Router()

notesRouter.get('/', (req, res) => {
  Note.find({}).then(notes => {
    res.json(notes)
  })
})

notesRouter.get('/:id', (req, res, next) => {
  Note.findById(req.params.id)
    .then(note => {
      if (note) {
        res.json(note)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

notesRouter.delete('/:id', (req, res, next) => {
  Note.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end() // 204: no content
    })
    .catch(error => naxt(error))
})

notesRouter.post('/', (req, res, next) => {
  const body = req.body

  const note = new Note({
    content: body.content,
    date: new Date(),
    important: body.important || false
  })

  note.save()
    .then(saved_note => res.json(saved_note))
    .catch(err => next(err))
})


notesRouter.put('/:id', (req, res, next) => {
  const { content, important } = req.body

  Note.findByIdAndUpdate(
    req.params.id,
    { content, important },
    { new: true, runValidators: true, context: 'query' })
    .then(updated_note => res.json(updated_note))
    .catch(error => next(error))
})

module.exports = notesRouter
