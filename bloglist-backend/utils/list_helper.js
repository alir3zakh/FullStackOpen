const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0)
    return 0

  return blogs.reduce(
    (prevVal, curVal) => prevVal + curVal.likes,
    0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0)
    return 0
  
  const unwrap = ({ title, author, likes }) =>
    ({ title, author, likes });

  const max_like = Math.max(...blogs.map(b => b.likes))
  const blog = blogs.find(b => b.likes === max_like)
  return unwrap(blog)
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
