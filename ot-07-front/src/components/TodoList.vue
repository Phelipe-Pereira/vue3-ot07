<template>
  <div class="todo-list">
    <div class="add-todo">
      <input v-model="newTodo" @keyup.enter="addTodo" placeholder="Adicionar nova tarefa" />
      <button @click="addTodo" :disabled="loading">
        {{ loading ? 'Adicionando...' : 'Adicionar' }}
      </button>
    </div>

    <div v-if="loading" class="loading">Carregando...</div>

    <div v-if="error" class="error-message">
      {{ error }}
    </div>

    <ul class="todos">
      <li v-for="todo in todos" :key="todo.id" class="todo-item">
        <div class="todo-content">
          <input type="checkbox" v-model="todo.completed" @change="updateTodo(todo)" />
          <span :class="{ completed: todo.completed }">{{ todo.title }}</span>
        </div>
        <button @click="deleteTodo(todo.id)" class="delete-btn">Excluir</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'

const todos = ref([])
const newTodo = ref('')
const loading = ref(false)
const error = ref('')

const fetchTodos = async () => {
  loading.value = true
  error.value = ''
  try {
    const response = await api.get('/todos')
    todos.value = response.data
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error)
    error.value = 'Erro ao carregar tarefas'
  } finally {
    loading.value = false
  }
}

const addTodo = async () => {
  if (!newTodo.value.trim()) return

  loading.value = true
  error.value = ''
  try {
    const response = await api.post('/todos', {
      title: newTodo.value,
    })
    todos.value.unshift(response.data)
    newTodo.value = ''
  } catch (error) {
    console.error('Erro ao adicionar tarefa:', error)
    error.value = 'Erro ao adicionar tarefa'
  } finally {
    loading.value = false
  }
}

const updateTodo = async (todo) => {
  loading.value = true
  error.value = ''
  try {
    await api.put(`/todos/${todo.id}`, {
      completed: todo.completed,
    })
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error)
    error.value = 'Erro ao atualizar tarefa'
    todo.completed = !todo.completed
  } finally {
    loading.value = false
  }
}

const deleteTodo = async (id) => {
  loading.value = true
  error.value = ''
  try {
    await api.delete(`/todos/${id}`)
    todos.value = todos.value.filter((todo) => todo.id !== id)
  } catch (error) {
    console.error('Erro ao excluir tarefa:', error)
    error.value = 'Erro ao excluir tarefa'
  } finally {
    loading.value = false
  }
}

onMounted(fetchTodos)
</script>

<style scoped>
.todo-list {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
}

.add-todo {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

input[type='text'] {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 8px 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.loading {
  margin: 10px 0;
  color: #666;
}

.error-message {
  margin: 10px 0;
  color: red;
}

.todos {
  list-style: none;
  padding: 0;
}

.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
  color: black;
}

.todo-content {
  display: flex;
  align-items: center;
  gap: 10px;
}

.completed {
  text-decoration: line-through;
  color: #999;
}

.delete-btn {
  background-color: #ff4444;
  padding: 4px 8px;
  font-size: 0.9em;
}
</style>
