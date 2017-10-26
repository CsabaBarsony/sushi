'use strict'

const express = require('express')
const db = require('./db')
const portNumber = 3001
const app = express()

app.use(express.static('public'))

app.get('/getSuggestions/:text', (req, res) => {
  db.macros(req.params.text, (success, foods) => {
    if(success) res.send(foods)
    else res.sendStatus(500)
  })
})

app.listen(portNumber, function () {
  console.log('App listening on port ' + portNumber + '...')
})
