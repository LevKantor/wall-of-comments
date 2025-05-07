import express from 'express'
import userRouter from './routes/user.routes.js'
import commentRouter from './routes/comment.routes.js'
import sequelize from './sequelize.js'

const app = express()
const PORT = process.env.PORT || 8080

app.use(express.json())

app.use(express.static('public'))

app.use('/api', userRouter)
app.use('/api', commentRouter)

// await sequelize.sync({ alter: true })
app.listen(PORT, () => console.log(`Server was started on port ${PORT}`))
