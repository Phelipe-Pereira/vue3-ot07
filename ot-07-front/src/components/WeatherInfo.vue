<template>
  <div class="weather-info">
    <div class="controls">
      <input v-model="city" placeholder="Digite a cidade" @keyup.enter="searchWeather" />
      <select v-model="unit">
        <option value="metric">Celsius</option>
        <option value="imperial">Fahrenheit</option>
      </select>
      <button @click="searchWeather" :disabled="loading">
        {{ loading ? 'Buscando...' : 'Buscar' }}
      </button>
    </div>

    <div v-if="loading" class="loading">Carregando informações do clima...</div>

    <div v-if="error" class="error-message">
      {{ error }}
    </div>

    <div v-if="weather" class="weather-data">
      <h2>{{ weather.name }}</h2>
      <p class="temperature">
        {{ Math.round(weather.main.temp) }}°{{ unit === 'metric' ? 'C' : 'F' }}
      </p>
      <p class="description">{{ weather.weather[0].description }}</p>
      <p>Umidade: {{ weather.main.humidity }}%</p>
      <p>Vento: {{ weather.wind.speed }} m/s</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { weatherApi } from '../services/api'

const city = ref('')
const unit = ref('metric')
const weather = ref(null)
const loading = ref(false)
const error = ref('')

const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_KEY

const searchWeather = async () => {
  if (!city.value) {
    error.value = 'Por favor, digite uma cidade'
    return
  }

  loading.value = true
  error.value = ''
  weather.value = null

  try {
    const response = await weatherApi.get(`/weather?q=${city.value}&units=${unit.value}&appid=${API_KEY}`)
    weather.value = response.data
  } catch (err) {
    error.value = 'Erro ao buscar informações do clima. Tente novamente.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.weather-info {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  color: black;
}

.controls {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

input,
select {
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
  margin-top: 10px;
  color: #666;
}

.error-message {
  margin-top: 10px;
  color: red;
}

.weather-data {
  margin-top: 20px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 4px;
  text-align: center;
}

.temperature {
  font-size: 2em;
  font-weight: bold;
  margin: 10px 0;
}

.description {
  text-transform: capitalize;
  color: #666;
}
</style>
