import { useState } from 'react';

const Blog = ({ blog, updateBlog }) => {
  const [display, setDisplay] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
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
          {blog.title} {displayButton()}
          <br />
          {blog.url}
          <br />
          {blog.likes}
          <button onClick={() => updateBlog(blog.id)}>like</button>
          <br />
          {blog.author}
        </> :
        <>
          {blog.title} {blog.author} {displayButton()}
        </>
      }
      {' '}

    </div>
  )
}

export default Blog
