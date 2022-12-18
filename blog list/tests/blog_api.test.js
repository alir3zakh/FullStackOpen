const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('when there is initially some bloges saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('blog identifier should exist and named id', async () => {
    const blogs = await helper.blogsInDB();

    blogs.forEach(blog => {
      expect(blog.id).toBeDefined()
    })

    const numBlogs = new Set(blogs.map(b => b.id)).size
    expect(numBlogs).toBe(helper.initialBlogs.length)
  })
})


describe('addition of a new blog', () => {
  test('with valid request works properly', async () => {
    const newBlog = {
      author: 'me',
      likes: 5,
      url: 'test/test.test',
      title: 'test'
    }

    const insertedBlog = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDB()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    expect(blogsAtEnd).toContainEqual({
      ...newBlog,
      id: insertedBlog.body.id
    })
  })

  test('if likes is missing, 0 should get inserted', async () => {
    const dummyBlog = {
      author: 'me',
      url: 'test/test.test',
      title: 'test'
    }

    const insertedBlog = await api
      .post('/api/blogs')
      .send(dummyBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect([insertedBlog.body]).toContainEqual({
      ...dummyBlog,
      likes: 0,
      id: insertedBlog.body.id
    })
  })

  test('with missing title or url should return error 400 & not fulfilled', async () => {
    const noURLBlog = {
      author: 'no url',
      title: 'test'
    }

    const noTitleBlog = {
      author: 'no title',
      url: 'test/test.test'
    }

    await api
      .post('/api/blogs')
      .send(noURLBlog)
      .expect(400)

    await api
      .post('/api/blogs')
      .send(noTitleBlog)
      .expect(400)
  })
})


describe('deletion of a blog', () => {
  test('returns code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDB()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDB()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

    expect(blogsAtEnd).not.toContainEqual(blogToDelete)
  })
})

describe('update of a blog', () => {
  test('should update likes properly', async () => {
    const blogsAtStart = await helper.blogsInDB()

    const blogToUpdate = {
      ...blogsAtStart[0],
      likes: blogsAtStart[0].likes + 5
    }

    console.log(blogToUpdate)

    const updatedBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)

    expect([updatedBlog.body]).toContainEqual(blogToUpdate)
   })
 })


afterAll(() => mongoose.connection.close())
