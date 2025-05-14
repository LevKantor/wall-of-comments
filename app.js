import 'dotenv/config'
import express from 'express'
import commentRouter from './routes/comment.routes.js'
import cors from 'cors'
// import sequelize from './sequelize.js'

const app = express()
const PORT = process.env.PORT || 8080

app.use(cors())
app.use(express.json())
app.use(express.static('public'))
app.use('/api', commentRouter)

// await sequelize.sync({ alter: true })
app.listen(PORT, () => console.log(`Server was started on port ${PORT}`))
