require('dotenv').config()

const express = require('express')
const util = require('util')
const childProcess = require('child_process')

const exec = util.promisify(childProcess.exec)
const app = express()
const port = process.env.PORT ?? 3000

const executeIrCommand = async (command) => {
  try {
    await exec(`irsend SEND_ONCE ac ${command}`)
  } catch (error) {
    console.log(error)
  }
}

app.use('/', express.static('public'))

app.post('/cool', async (request, response) => {
  await executeIrCommand('cool')
  response.status(204)
  response.send()
})

app.post('/fan', async (request, response) => {
  await executeIrCommand('fan')
  response.status(204)
  response.send()
})

app.post('/off', async (request, response) => {
  await executeIrCommand('off')
  response.status(204)
  response.send()
})

app.use((request, response) => {
  response.status(404)
  response.send('Not found')
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
