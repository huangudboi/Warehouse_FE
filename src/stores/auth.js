import { defineStore } from 'pinia'
import { loginAPI } from '@/api/auth'
import { setLocalStorageByItem } from '@/constants/utils'
import router from '@/router'
import { ref } from 'vue'
const defaultState = {

  userName: null,
  fullName: null

}
export const useAuthStore = defineStore('auth', () => {
  const dataUser = ref({ ...defaultState })
  const login = async (params) => {
    const response = await loginAPI(params)
    if (response?.success) {
      dataUser.value = { ...dataUser.value, ...response.data }
      setLocalStorageByItem('USER_LOGIN', response.data)
      router.replace('/home')
      return response
    }
    return null
  }
  return { login, dataUser }
})
