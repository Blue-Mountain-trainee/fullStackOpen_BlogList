const express = require('express')
const mongoose = require('mongoose')
const blogRouter = require('./controller/boglist')
const { logInfo, logError } = require('./utils/logger')
const { MONGODB_URI } = require('./utils/config')

const app = express()

mongoose.connect(MONGODB_URI, { family: 4 })
  .then(() => {
    logInfo('connected mongoDB.\n')
  })
  .catch(() => {
    logError('error connecting mongoDB.')
  })

app.use(express.json())
app.use('/api/blogs', blogRouter)

module.exports = app