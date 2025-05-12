const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const Todo = require('../models/Todo')

router.use(auth)

router.get('/', async (req, res) => {
  try {
    const todos = await Todo.findAll({ where: { userId: req.userData.userId }, order: [['createdAt', 'DESC']] })
    res.json(todos)
  } catch (error) {
    res.status(500).json({
      message: 'Erro ao buscar tarefas'
    })
  }
})

router.post('/', async (req, res) => {
  try {
    const { title } = req.body
    const todo = await Todo.create({ title, userId: req.userData.userId })
    res.status(201).json(todo)
  } catch (error) {
    res.status(500).json({
      message: 'Erro ao criar tarefa'
    })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { completed } = req.body
    const todo = await Todo.findOne({ where: { id, userId: req.userData.userId } })
    if (!todo) {
      return res.status(404).json({
        message: 'Tarefa não encontrada'
      })
    }
    todo.completed = completed
    await todo.save()
    res.json(todo)
  } catch (error) {
    res.status(500).json({
      message: 'Erro ao atualizar tarefa'
    })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const todo = await Todo.findOne({ where: { id, userId: req.userData.userId } })
    if (!todo) {
      return res.status(404).json({
        message: 'Tarefa não encontrada'
      })
    }
    await todo.destroy()
    res.json({
      message: 'Tarefa excluída com sucesso'
    })
  } catch (error) {
    res.status(500).json({
      message: 'Erro ao excluir tarefa'
    })
  }
})

module.exports = router 