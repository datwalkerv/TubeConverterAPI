const express = require('express')
const fetch = require('node-fetch')
const FormData = require('form-data')
const app = express()

app.use(express.json())

const mp3Router = require('./routes/mp3')
app.use('/mp3', mp3Router)

app.get('/', (req, res) => {
  res.json({
    status: 200,
    message: "TubeConverterAPI is a Youtube converter API with extra features! Read the docs: https://github.com/datwalkerv/TubeConverterAPI"
  })
})

app.listen(3000, () => {
  console.log(`TubeConverter has started!`)
})