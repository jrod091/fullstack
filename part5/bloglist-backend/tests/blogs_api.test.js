const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    const PromiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(PromiseArray)
})

describe('when there is initially some blogs saved', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type',/application\/json/)
    })

    test('all blogs returned', async () => {
        const res = await api.get('/api/blogs')
    
        expect(res.body.length).toBe(helper.initialBlogs.length)
    })

    test('a specific blog is within the returned blogs', async () => {
        const res = await api.get('/api/blogs')
    
        const titles = res.body.map(r => r.title)
    
        expect(titles).toContain('Canonical string reduction')
    })

    describe('viewing a specific blog', () => {
        test('succeeds with a specific blog', async () => {
            const blogsAtStart = await helper.blogsInDb()

            const blogToView = blogsAtStart[0]

            const resultBlog = await api
                .get(`/api/blogs/${blogToView.id}`)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            expect(resultBlog.body).toEqual(blogToView)
        })

        test('fails with status code 404 if blog does not exist', async () => {
            const validNoneExisitingId = await helper.nonExistingId()

            await api
                .get(`/api/blogs/${validNoneExisitingId}`)
                .expect(404)
        })

        test('fails with status code 400 id is invalid', async () => {
            const invalidId = '5a3d5da59070081a82a3445'

            await api
                .get(`/api/blogs/${invalidId}`)
                .expect(400)
        })
    })

    describe('addtion of a new blog', () => {
        test('succeeds with valid data', async () => {
            const newBlog = {
                "title": "testTitle",
                "author": "testAuthor",
                "url": "http://test.com",
                "likes": 3
            }
        
            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(200)
                .expect('Content-Type',/application\/json/)
            
            const blogsAtEnd = await helper.blogsInDb()
            expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)
        
            const titles = blogsAtEnd.map(r => r.title)
            expect(titles).toContain('testTitle')
        })

        test('succeeds when likes parameter is missing and defaults to 0', async () => {
            const newBlog = {
                "title": "testTitle",
                "author": "testAuthor",
                "url": "http://test.com"
            }
        
            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(200)
                .expect('Content-Type',/application\/json/)
            
            const blogsAtEnd = await helper.blogsInDb()
            expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)
        
            const likes = blogsAtEnd.map(r => r.likes)
            expect(likes).toContain(0)
        })

        test('fails with status code 400 if data invalid', async () => {
            const newBlog = {
                "author": "testAuthor",
                "likes": 3
            }
        
            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(400)

            const blogsAtEnd = await helper.blogsInDb()

            expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
        })
    })
    
    describe('updating blog', () => {
        test('successful update', async () => {
            const blogsAtStart = await helper.blogsInDb()

            const blogToUpdate = blogsAtStart[0]

            const updateBlog = {
                "title": blogToUpdate.title,
                "author": blogToUpdate.author,
                "url": blogToUpdate.url,
                "likes": 1235
            }

            await api
                .put(`/api/blogs/${blogToUpdate.id}`)
                .send(updateBlog)
                .expect(200)
                .expect('Content-Type',/application\/json/)

            const blogsAtEnd = await helper.blogsInDb()
            expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)

            const likes = blogsAtEnd.map(r => r.likes)
            expect(likes).toContain(1235)
        })
    })

    describe('deletion of a blog', () => {
        test('succeeds with status code 204 if ID is valid', async () => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToDelete = blogsAtStart[0]
        
            await api
                .delete(`/api/blogs/${blogToDelete.id}`)
                .expect(204)
        
            const blogsAtEnd = await helper.blogsInDb()
        
            expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1)
        
            const titles = blogsAtEnd.map(r => r.title)
        
            expect(titles).not.toContain(blogToDelete.title)
        })
    })
})

afterAll(() => mongoose.connection.close())