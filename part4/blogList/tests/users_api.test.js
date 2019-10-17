const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const User = require('../models/user')

describe('when there is initially one user at db', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const user = new User({ username: "root", password: "sekret"})
        await user.save()
    })

    test('creation succeeds with a frewsh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'jorger',
            name: 'Jorge Rodriguez',
            password: 'dont4get'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type',/application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper status code and message if username is already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'i4gotagain'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type',/application\/json/)

        expect(result.body.error).toContain('`username` to be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })

    test('creation fails with proper status code and message if username is not at least 3 chars long', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'ro',
            name: 'Superuser',
            password: 'i4gotagain'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type',/application\/json/)

        expect(result.body.error).toContain('shorter than the minimum allowed length')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })

    test('creation fails with proper status code and message if password not given', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'rooter',
            name: 'Superuser'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type',/application\/json/)

        expect(result.body.error).toContain('password required')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })

    test('creation fails with proper status code and message if password not minimum length', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'rooter',
            name: 'Superuser',
            password: 'ap'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type',/application\/json/)

        expect(result.body.error).toContain('length requirement not met')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })
})