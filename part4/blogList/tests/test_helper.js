const Blog = require('../models/blog')

const initialBlogs = [
    {
        "title": "Go To Statement Considered Harmful",
        "author": "Edsger W. Dijkstra",
        "url": "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        "likes": 5
    },
    {
        "title": "Canonical string reduction",
        "author": "Edsger W. Dijkstra",
        "url": "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        "likes": 12
    }
]

const nonExistingId = async () => {
    const blog = new Blog({ 
        title: 'willremove this soon',
        url: 'http://test/'
    })
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})

    return blogs.map(blog => blog.toJSON())
}

const User = require('../models/user')

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = { initialBlogs, nonExistingId, blogsInDb, usersInDb }