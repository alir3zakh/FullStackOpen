require('dotenv').config()

const express = require('express')
const app = express()

// const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(express.static('build'))

app.use(cors())
app.use(express.json())

// morgan middleware is used for logging
// app.use(morgan(function (tokens, req, res) {
//     return [
//         tokens.method(req, res),
//         tokens.url(req, res),
//         tokens.status(req, res),
//         tokens.res(req, res, 'content-length'), '-',
//         tokens['response-time'](req, res), 'ms',
//         tokens.method(req, res) === 'POST'
//             ? JSON.stringify(req.body) : '',
//     ].join(' ')
// }))

const baseURL = '/api/persons'

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

// needs new route handler
app.get('/info', (req, res) => {
    const info = `<p>Phonebook has info for ${persons.length} people</p>`
    const date = `<p>${new Date()}</p>`

    res.send(info + date)
})


app.get(baseURL, (request, response) => {
    Person.find({}).then(result => {
        response.json(result)
    })
})

app.get(baseURL + '/:id', (request, response) => {
    Person.findById(request.params.id).
        then(person => response.json(person))
})

// needs new route handler
app.delete(baseURL + '/:id', (req, res) => {
    const id = Number(req.params.id)

    persons = persons.filter(p => p.id !== id)
    res.status(204).end()
})

app.post(baseURL, (request, response) => {
    const body = request.body
    // const personExists = persons.find(p => p.name === body.name)

    if (!body.name) {
        return response.status(400).json({
            error: 'name property must be present'
        })
    }

    if (!body.number) {
        return response.status(400).json({
            error: 'number property must be present'
        })
    }

    // if (personExists) {
    //     return res.status(400).json({
    //         error: 'name property must be unique'
    //     })
    // }

    const newPerson = new Person({
        name: body.name,
        number: body.number,
    })

    newPerson.save().then(saved_person => {
        response.json(saved_person)
    })
})
