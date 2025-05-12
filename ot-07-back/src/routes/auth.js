const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/User')

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body
    const existingUser = await User.findOne({ where: { email } })
    if (existingUser) {
      return res.status(400).json({
        message: 'Email já cadastrado'
      })
    }
    const user = await User.create({ email, password })
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    )
    res.status(201).json({
      message: 'Usuário criado com sucesso',
      token
    })
  } catch (error) {
    res.status(500).json({
      message: 'Erro ao criar usuário'
    })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return res.status(401).json({
        message: 'Email ou senha inválidos'
      })
    }
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({
        message: 'Email ou senha inválidos'
      })
    }
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    )
    res.json({
      message: 'Login realizado com sucesso',
      token
    })
  } catch (error) {
    res.status(500).json({
      message: 'Erro ao fazer login'
    })
  }
})

module.exports = router 