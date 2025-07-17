<template>
  <div class="p-4 max-w-md mx-auto">
    <h2 class="text-2xl mb-4 font-bold">Login</h2>
    <form @submit.prevent="login">
      <input v-model="username" type="text" placeholder="Username" class="w-full mb-2 p-2 border" required />
      <input v-model="password" type="password" placeholder="Password" class="w-full mb-2 p-2 border" required />
      <button type="submit" class="bg-blue-600 text-white px-4 py-2">Login</button>
    </form>
    <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { authStore } from '../store/auth.js'

const username = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

async function login() {
  try {
    const response = await axios.post('http://ac7456a93a3414e4e904dca0100b158d-515219963.us-east-1.elb.amazonaws.com/api/token/', {
      username: username.value,
      password: password.value,
    })

    authStore.accessToken = response.data.access
    authStore.userusername = username.value

    localStorage.setItem('access', response.data.access)
    localStorage.setItem('refresh', response.data.refresh)
    localStorage.setItem('userusername', username.value)

    error.value = ''
    router.push('/eventos')
  } catch (err) {
    console.log('Erro no login:', err)
    error.value = 'Credenciais inválidas.'
  }
}
</script>
