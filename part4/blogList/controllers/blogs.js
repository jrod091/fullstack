const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

/* Get all blogs */
blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})

    response.json(blogs.map(blog => blog.toJSON()))
})

/* Get specific blog */
blogRouter.get('/:id', async (req,res,next) => {
    try {
        const blog = await Blog.findById(req.params.id)
        if(blog) {
            res.json(blog.toJSON())
        } else {
            res.status(404).end()
        }
    } catch (e) {
        next(e)
    }
})

/* Update blog */
blogRouter.put('/:id', async (req,res,next) => {
    const body = req.body

    const blog = {
        author: body.author,
        title: body.title,
        url: body.url,
        likes: body.likes
    }

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {new: true})
        res.json(updatedBlog.toJSON())
    } catch (e) {
        next(e)
    }
})

/* Add blog */
blogRouter.post('/', async (request, response, next) => {
    const body = request.body

    try {
        const decodeToken = jwt.verify(body.token, process.env.SECRET)
        if (!body.token || !decodeToken.id) {
            return res.status(401).json({ error: 'token missing or invalid' })
        }
        
        const user = await User.findById(decodeToken.id)

        const blog = new Blog({
            author: body.author,
            title: body.title,
            url: body.url,
            likes: body.likes === undefined ? 0 : body.likes,
            user: user._id
        })

        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.json(savedBlog.toJSON())
    } catch(e) {
        next(e)
    }
})

/* Delete blog */
blogRouter.delete('/:id', async (req,res,next) => {
    try {
        const blog = await Blog.findById(req.params.id)
        console.log(blog)

        const decodeToken = jwt.verify(req.body.token, process.env.SECRET)
        console.log(decodeToken)

        if (blog.user.toString() !== decodeToken.id.toString()) {
            return res.status(401).json({ error: "user trying to delete and user that created don't match" })
        }

        await Blog.findByIdAndRemove(req.params.id)
        res.status(204).end()
    } catch (e) {
        next(e)
    }
})

module.exports = blogRouter