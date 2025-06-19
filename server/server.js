import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import connectDB from "./config/db.js";
import authUser from './routes/userAuth.js'
import taskAuth from './routes/task.js'

dotenv.config()
const PORT = process.env.PORT || 5000;

const app = express()

app.use(cors())
app.use(express.json())
connectDB()

app.use('/api/auth', authUser)
app.use('/api/tasks',taskAuth)


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})