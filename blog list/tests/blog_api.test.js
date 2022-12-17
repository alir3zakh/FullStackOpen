const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const BlogObjects = helper.initialBlogs.map(b => new Blog(b))
  const promiseArray = BlogObjects.map(b => b.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-type', /application\/json/)
})

test('should return all blogs', async () => {
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

test('valid post request works properly', async () => {
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

afterAll(() => mongoose.connection.close())
