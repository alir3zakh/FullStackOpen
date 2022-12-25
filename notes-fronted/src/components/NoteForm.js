const NoteForm = ({ onSubmit, changeNoteHandle, value }) => {
  return (
    <form onSubmit={onSubmit}>
      <input
        value={value}
        onChange={changeNoteHandle}
      />
      <button type='submit'>save</button>
    </form>
  )
}

export default NoteForm
