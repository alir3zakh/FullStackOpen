import { useState, useEffect } from 'react'

import Note from './components/Note'
import Notification from './components/Notification';
import noteService from './services/note'
import loginService from './services/login'

const App = () => {
  //component states
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const dummyNote = {
      content: 'Dummy',
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: 10
    }

    noteService.getAll()
      .then(initialNotes =>
        setNotes(initialNotes.concat(dummyNote))
      )
  }, [])
  console.log('render', notes.length, 'notes')

  // event handlers
  const addNote = (event) => {
    event.preventDefault();

    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }

    noteService.create(noteObject)
      .then(newNote => {
        setNotes(notes.concat(newNote))
        setNewNote('')
      })
  }

  const loginHandler = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log(error)
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService.update(changedNote, id)
      .then(updatedNote => {
        setNotes(notes.map(n => n.id === id ? updatedNote : n))
      })
      .catch(error => {
        console.log(error)
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000);
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const changeNoteHandle = (event) => {
    setNewNote(event.target.value)
  }

  // other vars / functions
  const notesToShow = (showAll ?
    notes :
    notes.filter(note => note.important))

  const loginForm = () => (
    <form onSubmit={loginHandler}>
      <div>
        username:
        <input value={username} name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password:
        <input value={password} name="Password" type="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='Submit'>Login</button>
    </form>
  )

  const noteForm = () => (
    <form onSubmit={addNote}>
      <input
        value={newNote}
        onChange={changeNoteHandle}
      />
      <button type='submit'>save</button>
    </form>
  )

  return (
    <div>
      <h1>Notes</h1>

      <Notification message={errorMessage} />

      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged-in</p>
          {noteForm()}
        </div>
      }

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>

      <ul>
        {notesToShow.map(note =>
          <Note key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      <Footer />
    </div>
  )
}


const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }

  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2022</em>
    </div>
  )
}

export default App
