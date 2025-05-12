require('dotenv').config()
const express = require('express')
const cors = require('cors')
const sequelize = require('./database')
const authRoutes = require('./routes/auth')
const todoRoutes = require('./routes/todos')

const app = express()

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/todos', todoRoutes)

sequelize.sync().then(() => {
  console.log('Conectado ao MySQL e tabelas sincronizadas')
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
  })
}).catch(err => {
  console.error('Erro ao conectar ao MySQL:', err)
}) 