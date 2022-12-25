import { useState, useEffect, useRef } from 'react'

// component
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

// services
import blogService from './services/blogs'
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [notifMessage, setNotifMessage] = useState(null)

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

      setNotifMessage('success Successfully loged in')
      setTimeout(() => {
        setNotifMessage(null)
      }, 5000);
    }

    catch (exception) {
      console.error(exception)
      setNotifMessage('error Invalid Username or password')

      setTimeout(() => {
        setNotifMessage(null)
      }, 5000);
    }
  }

  const logoutHandler = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const createBlogRef = useRef()
  const createBlog = async (blogObj) => {
    try {
      createBlogRef.current.toggleVisibility()
      const insertedBlog = await blogService.create(blogObj)
      setBlogs(blogs.concat(insertedBlog))

      setNotifMessage(
        `success Blog: "${insertedBlog.title}" by ${insertedBlog.author} added`)
      setTimeout(() => {
        setNotifMessage(null)
      }, 5000);
    }

    catch (exception) {
      console.error(exception)
      setNotifMessage('error ' + exception)

      setTimeout(() => {
        setNotifMessage(null)
      }, 5000);
    }
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
      <p>
        {user.name} logged in
        <button onClick={logoutHandler}>logout</button>
      </p>

      <Togglable buttonLabel='New blog' ref={createBlogRef}>
        <BlogForm insertBlog={createBlog} />
      </Togglable>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}

    </div>
  )

  return (
    <div>
      <Notification message={notifMessage} />
      <h2>Blogs</h2>
      {user === null ? loginForm() : blogList()}
    </div>
  )
}

export default App
