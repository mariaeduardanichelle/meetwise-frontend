import { reactive } from 'vue'

export const authStore = reactive({
  accessToken: null,
  userEmail: null,
})
