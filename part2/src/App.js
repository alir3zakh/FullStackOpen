import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '040-44-5323523'
    }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={formSubmit}>
        <div>
          name:
          <input required
            value={newName}
            onChange={nameInputHandler} />
        </div>
        <div>
          number:
          <input required
            value={newNumber}
            onChange={numberInputHandler} />

        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <table id="numbers">
        <tbody>
          {persons.map(person =>
            <tr key={person.name}>
              <td>{person.name}</td>
              <td>{person.number}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default App
