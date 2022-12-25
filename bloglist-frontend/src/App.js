import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const userJSON = window.localStorage.getItem('loggedNoteappUser')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const loginHandler = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.error(error)
    }
  }

  const logoutHandler = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const createHandler = async (event) => {
    event.preventDefault()

    const newBlog = { title, author, url }
    const insertedBlog = await blogService.create(newBlog)

    setBlogs(blogs.concat(insertedBlog))

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const loginForm = () => (
    <form onSubmit={loginHandler}>
      <h2>log in to application</h2>
      <div>
        username
        <input name='Username' value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input name='Password' value={password} type='password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='Submit'>login</button>
    </form>
  )

  const createBlogForm = () => (
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
      <button type='submit'>create</button>
    </form>
  )

  const blogList = () => (
    <div>
      <h2>Blogs</h2>

      <p>
        {user.name} logged in
        <button onClick={logoutHandler}>logout</button>
      </p>

      {createBlogForm()}

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}

    </div>
  )

  return (
    <div>
      {user === null ? loginForm() : blogList()}
    </div>
  )
}

export default App
