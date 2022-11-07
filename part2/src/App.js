import { useState } from 'react'
import Note from './components/Note'

const App = (props) => {
  //component states
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('initial note state')
  const [showAll, setShowAll] = useState(true)

  // event handlers
  const addNote = (event) => {
    event.preventDefault();

    const noteObject = {
      id: notes.length + 1,
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    }

    setNotes(notes.concat(noteObject))
    setNewNote('')
  }

  const changeNoteHandle = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  // other vars / functions
  const notesToShow = (showAll ? notes :
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
