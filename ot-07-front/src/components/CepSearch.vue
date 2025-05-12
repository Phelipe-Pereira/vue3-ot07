<template>
  <div class="cep-search">
    <div class="search-box">
      <input v-model="cep" placeholder="Digite o CEP" @keyup.enter="searchCep" maxlength="8" />
      <button @click="searchCep" :disabled="loading">
        {{ loading ? 'Buscando...' : 'Buscar' }}
      </button>
    </div>

    <div v-if="loading" class="loading">Buscando informações do CEP...</div>

    <div v-if="error" class="error-message">
      {{ error }}
    </div>

    <div v-if="address" class="address-data">
      <h3>Endereço encontrado:</h3>
      <p><strong>CEP:</strong> {{ formatCep(address.cep) }}</p>
      <p><strong>Logradouro:</strong> {{ address.logradouro }}</p>
      <p><strong>Complemento:</strong> {{ address.complemento || 'N/A' }}</p>
      <p><strong>Bairro:</strong> {{ address.bairro }}</p>
      <p><strong>Cidade:</strong> {{ address.localidade }}</p>
      <p><strong>Estado:</strong> {{ address.uf }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { viaCepApi } from '../services/api'

const cep = ref('')
const address = ref(null)
const loading = ref(false)
const error = ref('')

const formatCep = (cep) => {
  return cep.replace(/(\d{5})(\d{3})/, '$1-$2')
}

const searchCep = async () => {
  if (!cep.value || cep.value.length !== 8) {
    error.value = 'Por favor, digite um CEP válido (8 dígitos)'
    return
  }

  loading.value = true
  error.value = ''
  address.value = null

  try {
    const response = await viaCepApi.get(`/${cep.value}/json`)
    if (response.data.erro) {
      throw new Error('CEP não encontrado')
    }
    address.value = response.data
  } catch (error) {
    console.error('Erro ao buscar CEP:', error)
    error.value = 'Erro ao buscar CEP. Verifique se o CEP está correto.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.cep-search {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
}

.search-box {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

input {
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

.address-data {
  margin-top: 20px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 4px;
  color: black;
}

h3 {
  margin-top: 0;
  color: #2c3e50;
}

p {
  margin: 5px 0;
}
</style>
