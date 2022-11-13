import { useState, useEffect } from 'react'

import Note from './components/Note'
import noteService from './services/note'

const App = () => {
  //component states
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('initial note state')
  const [showAll, setShowAll] = useState(true)

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
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    }

    noteService.create(noteObject)
      .then(newNote => {
        setNotes(notes.concat(newNote))
        setNewNote('')
      })

  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService.update(changedNote, id)
      .then(updatedNote => {
        setNotes(notes.map(n => n.id === id ? updatedNote : n))
      })
      .catch(error => {
        alert(`the note ${note.content} has been already deleted from server`)
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

  return (
    <div>
      <h1>Notes</h1>
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
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={changeNoteHandle}
        />
        <button type='submit'>save</button>
      </form>
    </div>
  )
}

export default App
