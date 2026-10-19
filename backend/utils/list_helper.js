const _ = require('lodash')

const dummy = (blogs) => {  
  return 1
}

const getTotalLikes = (blogs) => {
  const reducer = (sum, blog) => (sum += blog.likes)
  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const getMostLikedBlog = (blogs) => {
  return blogs.reduce((acc, blog) => (
    blog.likes > acc.likes
      ? blog
      : acc
  ))
}

const getTopBlogger = (blogs) => {
  const bloggers = blogs.reduce((acc, blog) => {
    if (!Object.hasOwn(acc, blog.author)) {
      acc[blog.author] = 0
    }
    acc[blog.author] += 1
    return acc
  }, {})

  let topBlogger = null

  for (const author in bloggers) {
    if (!topBlogger || bloggers[author] > topBlogger.blogs) {
      topBlogger = { author, blogs: bloggers[author] }
    }
  }

  return topBlogger
}

const getTopBloggerByLodash = (blogs) => {
  const countsObj = _.countBy(blogs, 'author')

  const authorList = _.map(countsObj, (blogs, author) => ({ author, blogs }))

  const topBlogger = _.maxBy(authorList, 'blogs')
  
  return topBlogger
}

const getMostLikedAuthor = (blogs) => {
  const group = _.groupBy(blogs, 'author')
  
  const authorList = _.map(group, (list, author) => ({ author, likes: _.sumBy(list, 'likes') }))

  const mostLikedAuthor = _.maxBy(authorList, 'likes')

  return mostLikedAuthor
}

const listHelper = {
  dummy,
  getTotalLikes,
  getMostLikedBlog,
  getTopBlogger,
  getTopBloggerByLodash,
  getMostLikedAuthor
}

module.exports = listHelper