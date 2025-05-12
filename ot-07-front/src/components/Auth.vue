<template>
  <div class="auth-form-wrapper">
    <div class="auth">
      <div class="auth-form">
        <h2>{{ isLogin ? 'Login' : 'Registro' }}</h2>

        <div class="form-group">
          <input v-model="email" type="email" placeholder="Email" />
        </div>

        <div class="form-group">
          <input v-model="password" type="password" placeholder="Senha" />
        </div>

        <div v-if="!isLogin" class="form-group">
          <input v-model="confirmPassword" type="password" placeholder="Confirmar senha" />
        </div>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <button @click="handleSubmit" :disabled="loading">
          {{ loading ? 'Processando...' : isLogin ? 'Entrar' : 'Registrar' }}
        </button>

        <p class="toggle-auth">
          {{ isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?' }}
          <a href="#" @click.prevent="toggleAuth">
            {{ isLogin ? 'Registre-se' : 'Faça login' }}
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '../services/api'

defineOptions({ name: 'AuthForm' })

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const isLogin = ref(true)
const loading = ref(false)
const error = ref('')

const handleSubmit = async () => {
  if (!email.value || !password.value) {
    error.value = 'Por favor, preencha todos os campos'
    return
  }

  if (!isLogin.value && password.value !== confirmPassword.value) {
    error.value = 'As senhas não coincidem'
    return
  }

  loading.value = true
  error.value = ''

  try {
    const endpoint = isLogin.value ? '/auth/login' : '/auth/register'
    const response = await api.post(endpoint, {
      email: email.value,
      password: password.value,
    })

    const token = response.data.token
    localStorage.setItem('token', token)

    alert(isLogin.value ? 'Login realizado com sucesso!' : 'Registro realizado com sucesso!')

    email.value = ''
    password.value = ''
    confirmPassword.value = ''
  } catch (error) {
    error.value = isLogin.value
      ? 'Erro ao fazer login. Verifique suas credenciais.'
      : 'Erro ao registrar. Tente novamente.'
  } finally {
    loading.value = false
  }
}

const toggleAuth = () => {
  isLogin.value = !isLogin.value
  error.value = ''
}
</script>

<style scoped>
.auth {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
}

.auth-form {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.error-message {
  color: red;
  margin: 10px 0;
  text-align: center;
}

.toggle-auth {
  text-align: center;
  margin-top: 15px;
}

.toggle-auth a {
  color: #4caf50;
  text-decoration: none;
}

.toggle-auth a:hover {
  text-decoration: underline;
}
</style>
