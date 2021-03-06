const logger = require('./logger')

const reqLogger = (req,res,next) => {
    logger.info('Method: ',req.method)
    logger.info('Path:   ',req.body)
    logger.info('Body:   ',req.body)
    logger.info('---')
    next()
}

const unknownEndpoint = (req, res) => res.status(404).send({ error: 'unknown endpoint' })

const errorHandler = (error, req, res, next) => {
    logger.error(error.message)

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message })
    } else if(error.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: 'invalid token' })
    }

    next(error)
}

const getTokenFrom = (req,res,next) => {
    const authorization = req.get('authorization')

    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        req.body.token = authorization.substring(7)
    }

    next()
}
module.exports = { reqLogger, unknownEndpoint, errorHandler, getTokenFrom }