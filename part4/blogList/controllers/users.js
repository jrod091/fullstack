const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (req,res,next) => {
    try {
        const body = req.body

        if(body.password === undefined) {
            return res.status(400).json({ error: "password required!" })
        }

        if(body.password.length < 3) {
            return res.status(400).json({ error: "password length requirement not met. Must be at least 3 characters long"})
        }
        
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash
        })

        const savedUser = await user.save()

        res.json(savedUser)
    } catch (e) {
        next(e)
    }
})

usersRouter.get('/', async (req,res) => {
    const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, id: 1 })
    res.json(users.map(u => u.toJSON()))
})

module.exports = usersRouter