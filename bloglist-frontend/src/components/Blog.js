import { useState } from 'react';
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, removeBlog, username }) => {
  const [display, setDisplay] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const confirmRemove = () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      removeBlog(blog.id)
    }
  }

  const displayButton = () => (
    <button onClick={() => setDisplay(!display)}>
      {display ? 'hide' : 'view'}
    </button>
  )

  return (
    <div style={blogStyle}>
      {display ?
        <>
          <p>{blog.title} {displayButton()} </p>
          <p>{blog.url}</p>
          <p>{blog.likes} {' '}
          <button onClick={() => updateBlog(blog.id)}>
            like
          </button></p>
          <p>{blog.author}</p>
          {blog.user.username === username
            ? <button onClick={() => confirmRemove()}>
              remove
            </button>
            : <></>
          }
        </>
        : <>
          {blog.title} {blog.author} {displayButton()}
        </>
      }
      {' '}
    </div>
  )
}

Blog.propType = {
  removeBlog: PropTypes.func.isRequired,
  updateBlog: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  blog: PropTypes.object.isRequired
}

export default Blog
