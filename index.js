const express = require('express')
const request = require('superagent')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  },
})

require('dotenv').config()

const { GoogleGenerativeAI } = require('@google/generative-ai')
const genAI = new GoogleGenerativeAI(String(process.env.API_KEY))
let chat

io.on('connection', (socket) => {
  console.log('connected to socket client')

  socket.on('chat', async ({ message, history }) => {
    if (!chat) {
      const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-pro',
        systemInstruction: process.env.SYSTEM,
      })

      const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 70,
        responseMimeType: 'text/plain',
      }

      chat = model.startChat({
        generationConfig,
        history,
      })
    }
    const result = await chat.sendMessageStream(message)

    for await (const chunk of result.stream) {
      try {
        const chunkText = chunk.text()
        console.log(chunkText)
        io.emit('message', chunkText)
      } catch (error) {
        console.error('Error emitting chunk:', error)
      }
    }
  })

  socket.on('disconnect', () => {
    console.log('Client disconnected')
  })
})

server.listen(3000, () => {
  console.log('listening on *:3000')
})

app.post('/audio', async (req, res) => {
  const payload = req.body
  console.log(payload)
  try {
    const response = await request
      .post(`${process.env.SPEECH_API_URL}?key=${process.env.GOOGLE_API_KEY}`)
      .send(payload)

    console.log(response)
    res.send(response.body)
  } catch (error) {
    console.error(error)
  }
})
