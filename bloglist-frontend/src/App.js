import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const userJSON = window.localStorage
      .getItem('loggedNoteappUser')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      setUser(user)
    }
  }, [])

  const loginHandler = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
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

  const blogList = () => (
    <div>
      <h2>blogs</h2>

      <p>{user.name} logged in</p>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
        )}
      <button onClick={logoutHandler}>logout</button>
    </div>
  )

  return (
    <div>
      {user === null ? loginForm() : blogList()}
    </div>
  )
}

export default App
