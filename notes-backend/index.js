require('dotenv').config()

const express = require('express')
const app = express()

const cors = require('cors')
const Note = require('./models/note')


// middlewares
app.use(express.static('build'))
// allow for requests from all origins
app.use(cors())
app.use(express.json())

const baseURL = '/api/notes/'
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get(baseURL, (req, res) => {
    Note.find({}).then(notes => {
        res.json(notes)
    })
})

app.get(`${baseURL}:id`, (req, res, next) => {
    Note.findById(req.params.id)
        .then(note => {
            if (note) {
                res.json(note)
            } else {
                res.status(404).end()
            }
        })
        .catch(error => {
            console.log(error)
            next(error)
        })
})

app.delete(`${baseURL}:id`, (req, res, next) => {
    Note.findByIdAndRemove(req.params.id)
        .then(result => {
            // 204: no content
            res.status(204).end()
        })
        .catch(error => naxt(error))
})

app.post(baseURL, (req, res, next) => {
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

app.put(`${baseURL}:id`, (req, res, next) => {
    const { content, important } = req.body

    Note.findByIdAndUpdate(
        req.params.id,
        { content, important },
        { new: true, runValidators: true, context: 'query' })
        .then(updated_note => res.json(updated_note))
        .catch(error => next(error))
})

// req handler for unknown endpoint
// ** HAS TO BE NEXT TO LAST
app.use((req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
})


// error handler
// ** HAS TO BE LAST
app.use((err, req, res, next) => {
    console.log(err.message)

    if (err.name === 'CastError') {
        return res.status(400)
            .send({ error: 'malformatted id' })
    } else if (err.name === 'ValidationError') {
        return res.status(400).json({ error: err.message })
    }
    // pass the error to default Express error handler
    next(err)
})
