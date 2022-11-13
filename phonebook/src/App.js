import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setnameFilter] = useState('')

  //event handlers
  const formSubmit = (event) => {
    event.preventDefault()

    const namesList = persons.reduce((namesList, person) => namesList.concat(person.name), [])

    if (namesList.includes(newName)) {
      alert(`${newName} is already added to phonebook`)
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    }

    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }

  const nameInputHandler = (event) => {
    setNewName(event.target.value)
  }

  const numberInputHandler = (event) => {
    setNewNumber(event.target.value)
  }

  const searchInputHandler = (event) => {
    setnameFilter(event.target.value)
  }

  const personsToShow = persons.filter(
    person => person.name.startsWith(nameFilter)
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchInputHandler={searchInputHandler} />

      <h3>Add a new</h3>
      <PersonForm onSubmit={formSubmit}
        newName={newName}
        nameInputHandler={nameInputHandler}
        newNumber={newNumber}
        numberInputHandler={numberInputHandler}
      />

      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

const Filter = ({ searchInputHandler }) => {
  return (
    <>
      <span>filter shown with</span>
      <input onChange={searchInputHandler} />
    </>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        name:
        <input required
          value={props.newName}
          onChange={props.nameInputHandler} />
      </div>
      <div>
        number:
        <input required
          value={props.newNumber}
          onChange={props.numberInputHandler} />

      </div>

      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ personsToShow }) => {
  return (
    <table id="numbers">
      <tbody>
        {personsToShow.map(person =>
          <tr key={person.name}>
            <td>{person.name}</td>
            <td>{person.number}</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default App
