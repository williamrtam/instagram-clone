import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import postsRoute from './routes/posts.js'
import userRoutes from './routes/users.js'
import authRoutes from './routes/auth.js'

dotenv.config()
const app = express()

app.use(bodyParser.json({limit: '25mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '25mb', extended: true}))
app.use(cors())

// routes
app.use('/posts', postsRoute)
app.use('/users', userRoutes)
app.use('/auth', authRoutes)

const PORT = process.env.Port || 5000

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`))
  )
  .catch((error) => console.log(error.message))

mongoose.set('useFindAndModify', false)
