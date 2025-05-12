<script setup>
import { ref } from 'vue'
import Auth from './components/Auth.vue'
import CepSearch from './components/CepSearch.vue'
import WeatherInfo from './components/WeatherInfo.vue'
import TodoList from './components/TodoList.vue'

const isAuthenticated = ref(!!localStorage.getItem('token'))

window.addEventListener('storage', () => {
  isAuthenticated.value = !!localStorage.getItem('token')
})

function handleLogin() {
  isAuthenticated.value = true
}
function handleLogout() {
  isAuthenticated.value = false
}
</script>

<template>
  <div class="app">
    <header>
      <h1>Projeto de Integração com APIs</h1>
    </header>

    <main>
      <div class="container">
        <section class="auth-section">
          <Auth @login="handleLogin" @logout="handleLogout" />
        </section>

        <section class="features">
          <div class="feature">
            <h2>Busca de CEP</h2>
            <CepSearch />
          </div>

          <div class="feature">
            <h2>Previsão do Tempo</h2>
            <WeatherInfo />
          </div>

          <div class="feature">
            <h2>Lista de Tarefas</h2>
            <TodoList v-if="isAuthenticated" />
            <div v-else style="text-align:center; color:#888;">Faça login para acessar sua lista de tarefas.</div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  background-color: #f0f2f5;
}

.app {
  min-height: 100vh;
}

header {
  background-color: #2c3e50;
  color: white;
  padding: 1rem;
  text-align: center;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.auth-section {
  margin-bottom: 2rem;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.feature {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem;
}

h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
  text-align: center;
}
</style>
