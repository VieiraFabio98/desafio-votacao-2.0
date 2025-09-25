import express from 'express'
import cors from 'cors'
import 'reflect-metadata'
import { router } from './routes'
import 'dotenv/config'

const app = express()

app.use(express.json({limit: '250mb'}))

const options:  cors.CorsOptions = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}

app.use(cors(options))

app.use(router)

export { app}