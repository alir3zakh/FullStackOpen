import { useState, useEffect } from 'react'

import Note from './components/Note'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import NoteForm from './components/NoteForm'
import Footer from './components/Footer'

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
    noteService.getAll()
      .then(initialNotes => setNotes(initialNotes))
  }, [])
  console.log('render', notes.length, 'notes')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])


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
      noteService.setToken(user.token)
      window.localStorage.setItem(
        'loggedNoteappUser',
        JSON.stringify(user)
      )

      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (error) {
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

  // other functions
  const notesToShow = (showAll ?
    notes :
    notes.filter(note => note.important))

  return (
    <div>
      <h1>Notes</h1>

      <Notification message={errorMessage} />

      {user === null ?
        <Togglable buttonLabel='Login'>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={loginHandler}
          />
        </Togglable>
        :
        <div>
          <p>{user.name} logged-in</p>
          <Togglable buttonLabel="new note">
            <NoteForm
              onSubmit={addNote}
              value={newNote}
              changeNoteHandle={({ target }) => setNewNote(target.value)}
            />
          </Togglable>
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

export default App
