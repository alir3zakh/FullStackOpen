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
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get(baseURL, (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})

app.get(`${baseURL}:id`, (request, response, next) => {
    Note.findById(request.params.id)
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

app.delete(`${baseURL}:id`, (request, response, next) => {
    Note.findByIdAndRemove(request.params.id)
        .then(result => {
            // 204: no content
        response.status(204).end()
        })
        .catch(error => naxt(error))

    response.status(204).end()
})

app.post(baseURL, (request, response, next) => {
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

app.put(`${baseURL}:id`, (request, response, next) => {
    const body = request.body

    const note = {
        content: body.content,
        important: body.important
    }

    Note.findByIdAndUpdate(request.params.id, note, { new: true })
        .then(updated_note => {
        response.json(updated_note)
        })
        .catch(error => next(error))
})

// important: has to be next to the last middleware
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

// error handlers
const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    // pass the error to default Express error handler
    next(error)
}

// important: has to be last middleware
app.use(errorHandler)
