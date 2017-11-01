var express = require('express')
var path = require('path')
var fs = require('fs')

var app = express()
app.use(express.static(path.resolve(__dirname, '')))

app.head('/', (req, res) => {
  res.status(200).end()
})

app.all('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '/index.html'))
})

app.listen(8888, () => {
  console.log(`========== Server Start At Port 8888  ==========`)
})
