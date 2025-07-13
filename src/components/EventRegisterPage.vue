<template>
  <div class="p-6 max-w-xl mx-auto">
    <h2 class="text-2xl font-bold mb-4">Eventos disponíveis</h2>

    <div v-if="!token" class="text-red-600">
      Faça login para visualizar os eventos.
    </div>

    <div v-else>
      <div v-if="events.length === 0">Nenhum evento encontrado.</div>
      <div v-else class="space-y-4">
        <div
          v-for="event in events"
          :key="event.id"
          class="border p-4 rounded shadow"
        >
          <h3 class="text-lg font-semibold">{{ event.name }}</h3>
          <p class="text-sm">{{ event.description }}</p>
          <button
            class="mt-2 px-4 py-1 bg-blue-600 text-white rounded"
            @click="registerForEvent(event.id)"
            :disabled="loading"
          >
            Registrar
          </button>
        </div>
      </div>
    </div>

    <p v-if="message" class="mt-4 text-green-600">{{ message }}</p>
    <p v-if="error" class="mt-4 text-red-600">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const events = ref([])
const message = ref('')
const error = ref('')
const loading = ref(false)

const token = localStorage.getItem('access')
const user_id = localStorage.getItem('user_id')

async function fetchEvents() {
  try {
    const response = await axios.get('http://localhost:8000/events/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    events.value = response.data
  } catch (err) {
    error.value = 'Erro ao carregar eventos.'
  }
}

async function registerForEvent(eventId) {
  try {
    loading.value = true
    await axios.post(
      'http://localhost:8000/register/',
      {
        user_id: user_id,
        event_id: eventId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    message.value = 'Registro realizado com sucesso!'
    error.value = ''
  } catch (err) {
    error.value = 'Erro ao registrar no evento.'
    message.value = ''
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (token) {
    fetchEvents()
  }
})
</script>
