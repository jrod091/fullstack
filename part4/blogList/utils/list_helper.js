const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let likes = 0

    blogs.map(blog => likes += blog.likes)

    return likes
}

const favoriteBlog = (blogs) => {
    let likes = 0
    let favorite = {}

    blogs.map(blog => {
        if (blog.likes > likes) {
            likes = blog.likes
            favorite = {
                title: blog.title,
                author: blog.author,
                likes: blog.likes
            }
        }
    })

    return favorite
}

const mostBlogs = (blogs) => {
    const authors = _.uniq(_.map(blogs, 'author'))

    const results = _.map(authors, author => {
        let length = _.reject(blogs, el => el.author.indexOf(author) < 0).length

        return {author: author, blogs: length}
    })

    const max = results.sort((a,b) => b.blogs-a.blogs)[0]

    return max
}

const mostLikes = (blogs) => {
    let results = {}

    _.each(blogs, blog => {
        results[blog.author] = (results[blog.author] || 0) + blog.likes
    })

    const max = _.maxBy(_.keys(results), key => results[key])

    return {author: max, likes: results[max]}
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }