const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
    .populate('user', {name: 1, username: 1})
  res.json(blogs)
})

blogsRouter.put('/:id', async (req, res) => {
  const { title, author, url, likes, user } = req.body

  const updated_blog = await Blog.findByIdAndUpdate(
    req.params.id,
    { title, author, url, likes, user },
    { new: true, runValidators: true, context: 'query' }
  )

  res.json(updated_blog)
})

blogsRouter.post('/', async (req, res) => {
  const randomUser = await User.findOne()
  console.log(randomUser)

  const blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes || 0,
    user: randomUser._id
  })

  const savedBlog = await blog.save()
  randomUser.blogs = randomUser.blogs.concat(savedBlog._id)
  await randomUser.save()

  res.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end() // 204: no content
})

module.exports = blogsRouter
