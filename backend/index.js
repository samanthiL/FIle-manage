const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

const api = require('../backend/routes/user.routes')
const config = require('../backend/database/db');

mongoose
  .connect(config.db)
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch((err) => {
    console.log('Error connecting to mongo')

    console.error('Error connecting to mongo', err.reason)
  })

const app = express()


app.get('/about', (req, res) => {
  res.send('About birds')
})
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
)
app.use(cors())

app.use('/public', express.static('public'))

app.use('/api', api)

const port = process.env.PORT || 8022
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})
