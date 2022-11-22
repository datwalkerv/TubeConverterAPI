const express = require('express')
const fetch = require('node-fetch')
const FormData = require('form-data')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors({
  methods: ['GET'],
  origin: '*'
}));

const mp3Router = require('./routes/mp3')
app.use('/mp3', mp3Router)
const mkvRouter = require('./routes/mkv')
app.use('/mkv', mkvRouter)

app.get('/', (req, res) => {
  res.json({
    status: 200,
    message: "TubeConverterAPI is a Youtube converter API with extra features! Read the docs: https://github.com/datwalkerv/TubeConverterAPI"
  })
})

app.listen(3000, () => {
  console.log(`TubeConverter has started!`)
})