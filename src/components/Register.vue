<template>
  <div class="p-4 max-w-md mx-auto">
    <h2 class="text-2xl mb-4 font-bold">Cadastro</h2>
    <form @submit.prevent="register">
    <input v-model="username" type="text" placeholder="Nome de usuário" class="w-full mb-2 p-2 border" required />
      <input v-model="email" type="email" placeholder="Email" class="w-full mb-2 p-2 border" required />
      <input v-model="password" type="password" placeholder="Senha" class="w-full mb-2 p-2 border" required />
      <button type="submit" class="bg-green-600 text-white px-4 py-2">Cadastrar</button>
      <p>
        Já possui conta? Faça
        <a href="/login" class="text-blue-600 hover:underline">login</a>
      </p>
    </form>
    <p v-if="success" class="text-green-500 mt-2">{{ success }}</p>
    <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const username = ref('')
const email = ref('')
const password = ref('')
const error = ref('')
const success = ref('')

async function register() {
  try {
    await axios.post('http://ac7456a93a3414e4e904dca0100b158d-515219963.us-east-1.elb.amazonaws.com/api/register/', {
      username: username.value,
      email: email.value,
      password: password.value,
    })
    error.value = ''
    success.value = 'Cadastro realizado com sucesso!'
  } catch (err) {
    error.value = 'Erro ao cadastrar usuário.'
    success.value = ''
    router.push('/login')
  }
}
</script>
