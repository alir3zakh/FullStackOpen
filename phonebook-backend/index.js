const { response } = require('express')
const express = require('express')
const app = express()


const persons = [
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
const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

app.get('/info', (req, res) => {
    const info = `<p>Phonebook has info for ${persons.length} people</p>`
    const date = `<p>${new Date()}</p>`

    console.log(info + date);
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
