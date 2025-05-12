# Projeto Fullstack: Integração com APIs (Vue.js + Node.js + MongoDB)

Este projeto é um sistema fullstack simples para estudo, integrando frontend em Vue.js 3, backend em Node.js/Express e banco de dados MongoDB. Ele demonstra autenticação JWT, CRUD de tarefas, busca de endereço por CEP (ViaCEP) e consulta de clima (OpenWeatherMap).

## Funcionalidades

- Cadastro e login de usuário (JWT)
- CRUD de tarefas (adicionar, listar, editar, excluir)
- Busca de endereço por CEP (API ViaCEP)
- Consulta de clima por cidade (API OpenWeatherMap)
- Seleção de unidade de temperatura (Celsius/Fahrenheit)
- Indicadores de carregamento e mensagens de erro amigáveis

## Tecnologias Utilizadas

- **Frontend:** Vue.js 3, Axios
- **Backend:** Node.js, Express, Mongoose, JWT, bcryptjs
- **Banco de Dados:** MongoDB
- **APIs externas:** ViaCEP, OpenWeatherMap

## Instalação e Execução

### Pré-requisitos
- Node.js e npm instalados
- MongoDB rodando localmente

### 1. Clone o repositório
```bash
# Clone este repositório
https://github.com/seu-usuario/seu-repo.git
cd seu-repo
```

### 2. Backend
```bash
cd ot-07-back
npm install
```
Crie um arquivo `.env` em `ot-07-back` com o conteúdo:
```
MONGODB_URI=mongodb://localhost:27017/ot-07
JWT_SECRET=sua_chave_secreta
PORT=3000
```
Inicie o backend:
```bash
npm run dev
```

### 3. Frontend
Abra outro terminal e execute:
```bash
cd ot-07-front
npm install
npm run dev
```
Acesse o endereço mostrado (geralmente http://localhost:5173)

### 4. OpenWeatherMap
- Crie uma conta gratuita em https://openweathermap.org/api
- Pegue sua chave de API
- No arquivo `ot-07-front/src/components/WeatherInfo.vue`, substitua `const API_KEY = '...'` pela sua chave

## Como usar
- Cadastre-se ou faça login
- Use a busca de CEP para consultar endereços
- Consulte o clima de qualquer cidade
- Adicione, marque como concluída e exclua tarefas

## Observações
- O backend só aceita requisições autenticadas para tarefas (CRUD)
- O token JWT é salvo automaticamente após login/registro
- O projeto é para fins didáticos, sem preocupações avançadas de segurança

## Licença
MIT 