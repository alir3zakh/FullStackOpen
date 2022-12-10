const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

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

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

const baseURL = '/api/persons'
const PORT = 8080

const generateID = () => {
    return Math.floor(Math.random() * 1e6)
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

app.get('/info', (req, res) => {
    const info = `<p>Phonebook has info for ${persons.length} people</p>`
    const date = `<p>${new Date()}</p>`

    res.send(info + date)
})


app.get(baseURL, (req, res) => {
    res.json(persons)
})

app.get(baseURL + '/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)

    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete(baseURL + '/:id', (req, res) => {
    const id = Number(req.params.id)

    persons = persons.filter(p => p.id !== id)
    res.status(204).end()
})

app.post(baseURL, (req, res) => {
    const body = req.body
    const personExists = persons.find(p => p.name === body.name)

    if (!body.name) {
        return res.status(400).json({
            error: 'name property must be present'
        })
    }

    if (!body.number) {
        return res.status(400).json({
            error: 'number property must be present'
        })
    }

    if (personExists) {
        return res.status(400).json({
            error: 'name property must be unique'
        })
    }

    const newPerson = {
        name: body.name,
        number: body.number,
        id: generateID()
    }
    persons.concat(newPerson)
    res.json(newPerson)
})
