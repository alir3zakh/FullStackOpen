const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

if(![3,5].includes(process.argv.length)){
    console.log('invalid arguments')
    process.exit(1)
}

const password = process.argv[2]
const uri = `mongodb+srv://alir3zakh:${password}@cluster0.5vugccj.mongodb.net/phonebookApp?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Perosn', personSchema)

mongoose.connect(uri).then(res => {
    if(process.argv.length === 3){
        Person.find({}).then(res =>  {
            console.log('phonebook:');
            res.forEach(p => {
                console.log(p.name, p.number)
            });

            mongoose.connection.close()
        })
    } else {
        const newPerson = new Person({
            name: process.argv[3],
            number: process.argv[4]
        })

        newPerson.save().then(res => {
            console.log(`added ${newPerson.name} number ${newPerson.number} to phonebook`);
            mongoose.connection.close()
        })
    }
})
