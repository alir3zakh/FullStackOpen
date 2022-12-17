const blogsRouter = require('express').Router()
const Blog = require('../models/blog');

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

blogsRouter.put('/:id', async (req, res) => {
  const { title, author, url, likes } = req.body

  const updated_blog = await Blog.findByIdAndUpdate(
    req.params.id,
    { title, author, url, likes },
    { new: true, runValidators: true, context: 'query' }
  )

  res.json(updated_blog)
})

blogsRouter.post('/', async (req, res) => {
  const blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes
  })

  const result = await blog.save()
  res.status(201).json(result)
})

module.exports = blogsRouter
