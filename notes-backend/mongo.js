const mongoose = require('mongoose')
mongoose.set('strictQuery', false);

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]

const uri = `mongodb+srv://alir3zakh:${password}@cluster0.5vugccj.mongodb.net/noteApp?retryWrites=true&w=majority`

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

mongoose
    .connect(uri)
    .then((result) => {
        console.log('connected')

        Note.find({}).then(result => {
            result.forEach(note => {
                console.log(note)
            })
            mongoose.connection.close()
        })
    })
    .catch((err) => console.log(err))
