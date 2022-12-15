const config = require('./utils/config')
const logger = require('./utils/logger')

const express = require('express')
const app = express()

const cors = require('cors')
const notesRouter = require('./controllers/note')


// allow for requests from all origins
app.use(cors())
app.use(express.static('build'))
app.use(express.json())
// app.use(middleware.requestLogger)

app.use('/api/notes', notesRouter)

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})

// app.get('/', (req, res) => {
//   res.send('<h1>Hello World!</h1>')
// })



// req handler for unknown endpoint
// ** HAS TO BE NEXT TO LAST
app.use((req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
})


// error handler
// ** HAS TO BE LAST
app.use((err, req, res, next) => {
  logger.error(err.message)

  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  }
  // pass the error to default Express error handler
  next(err)
})
