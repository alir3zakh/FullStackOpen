import { useState, useEffect } from 'react'
import personServices from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setnameFilter] = useState('')
  const [notifMessage, setNotifMessage] = useState(null)
  const [notifType, setNotifType] = useState('')

  // Loading initial phonebook
  useEffect(() => {
    personServices.getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])


  //event handlers
  const formSubmit = (event) => {
    event.preventDefault()
    const personExists = persons.find(p => p.name === newName)

    if (personExists) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)) {
        personServices
          .updatePerson(personExists.id,
            { ...personExists, number: newNumber })
          .then(response => {
            setPersons(persons.map(p => p.name !== newName ? p : response))
            setNewName('')
            setNewNumber('')
            setNotifMessage(`${newName}'s number updated`)
            setNotifType('success')
            setInterval(() => setNotifMessage(null), 5000);
          })
          .catch((error) => {
            setNotifMessage(error.response.data.error)
            setNotifType('error')
            setInterval(() => setNotifMessage(null), 5000);
            setPersons(persons.filter(p => p.id !== personExists.id))
          })
      }
    }

    else {
      const newPerson = {
        name: newName,
        number: newNumber,
      }

      personServices.addNew(newPerson)
        .then(response => {
          setPersons(persons.concat(response))
          setNewName('')
          setNewNumber('')
          setNotifMessage(`${newName} added`)
          setNotifType('success')
          setInterval(() => setNotifMessage(null), 5000);
        })
        .catch(error => {
          setNotifMessage(error.response.data.error)
          setNotifType('error')
          setInterval(() => setNotifMessage(null), 5000)
        })
    }
  }

  const deletePersonHandler = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`delete ${person.name}?`)) {
      personServices.deletePerson(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          setNotifMessage(`${person.name} deleted`)
          setNotifType('success')
          setInterval(() => setNotifMessage(null), 5000);
        })
        .catch(() => {
          setNotifMessage(`${person.name} has already been deleted from server`)
          setNotifType('error')
          setInterval(() => setNotifMessage(null), 5000);
          setPersons(persons.filter(p => p.id !== id))
        })
    }
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

  // Other Functions
  const personsToShow = persons.filter(
    person => person.name.startsWith(nameFilter)
  )

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification
        message={notifMessage}
        type={notifType}
      />
      <Filter searchInputHandler={searchInputHandler} />

      <h3>Add a new</h3>
      <PersonForm onSubmit={formSubmit}
        newName={newName}
        nameInputHandler={nameInputHandler}
        newNumber={newNumber}
        numberInputHandler={numberInputHandler}
      />

      <h3>Numbers</h3>
      <Persons
        personsToShow={personsToShow}
        deleteHandler={deletePersonHandler}
      />
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

const Persons = ({ personsToShow, deleteHandler }) => {
  return (
    <table id="numbers">
      <tbody>
        {personsToShow.map(person =>
          <tr key={person.id}>
            <td>{person.name}</td>
            <td>{person.number}</td>
            <td>
              <button onClick={() => deleteHandler(person.id)}>
                delete
              </button>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

const Notification = ({ message, type }) => {
  if (message === null) return null
  return (
    <div className={'notification ' + type}>
      {message}
    </div>
  )
}

export default App
