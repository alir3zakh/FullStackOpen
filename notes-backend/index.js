require('dotenv').config()

const express = require('express')
const app = express()

const cors = require('cors')
const Note = require('./models/note')

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    // pass the error to default Express error handler
    next(error)
}


// middlewares
app.use(express.static('build'))
// allow for requests from all origins
app.use(cors())
app.use(express.json())

// important: has to be last middleware
app.use(errorHandler)


app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})

app.get('/api/notes/:id', (request, response, next) => {
    Note.findById(request.body.id)
        .then(note => {
            if (note) {
                response.json(note)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => {
            console.log(error)
            next(error)
    })
})

app.delete('/api/notes/:id', (request, response) => {


    response.status(204).end()
})

app.post('/api/notes', (request, response) => {
    const body = request.body

    if (!body.content) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const note = new Note({
        content: body.content,
        date: new Date(),
        important: body.important || false
    })

    note.save().then(saved_note => {
        response.json(saved_note)
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
