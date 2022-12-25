import { useState } from 'react'

const BlogForm = ({ insertBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createHandler = async (event) => {
    event.preventDefault()

    const newBlog = { title, author, url }
    insertBlog(newBlog)

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={createHandler}>
      <h3>Create New</h3>
      <div>
        Title:
        <input name='Title' value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        Author:
        <input name='Author' value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        URL:
        <input name='URL' value={url} type='url'
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type='submit'>Create</button>
    </form>
  )
}

export default BlogForm
