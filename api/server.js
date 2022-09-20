const express = require('express')
const cors = require('cors')

const server = express()
server.use(cors())
server.use(express.json());

const completedRoutes = require('./routes/completed')
const habitsRoutes = require('./routes/habits')
const usersRoutes = require('./routes/users')

server.get('/', (req, res) => res.send('Welcome to ACHIEVED'))

server.use('/completion_dates', completedRoutes)
server.use('/habits', habitsRoutes)
server.use('/users', usersRoutes)


module.exports = server
