import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json({limit: '250mb'}))

const options:  cors.CorsOptions = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}

app.use(cors(options))

export { app}