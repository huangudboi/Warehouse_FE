import { defineStore } from 'pinia'
import { loginAPI, registerAPI } from '@/api/auth'
import { setLocalStorageByItem } from '@/constants/utils'
import router from '@/router'
import { ref } from 'vue'
import { MODAL_TYPE } from '@/constants'
import { useModalStore } from './modal'

const defaultState = {
  userName: '',
  wareHouseCode: '',
  token: ''
}

export const useAuthStore = defineStore('auth', () => {
  const {openModal} = useModalStore()
  const dataUser = ref({ ...defaultState })
  //Hàm checklogin
  const login = async (params) => {
    const response = await loginAPI(params)
    if (response?.success||response.status===1) {
      dataUser.value = { ...dataUser.value, ...response.data }
      setLocalStorageByItem('USER_LOGIN', response.data)
      openModal({
        open: true,
        type: MODAL_TYPE.SUCCESS,
        title: 'Success',
        content: 'Login successful.',
        okText: 'OK'
      })
      router.replace('/')
      return response
    }
    return null
  }
  //Hàm register
  const register = async (params) => {
    const {openModal} = useModalStore()
    const response = await registerAPI(params)
    if (response?.success||response.status===1) {
      dataUser.value = { ...dataUser.value, ...response.data }
      openModal({
        open: true,
        type: MODAL_TYPE.SUCCESS,
        title: 'Success',
        content: 'Register successfull -> Go to register.',
        okText: 'OK'
      })
      router.replace('/login')
      return response
    }
    return null
  }

  return { login, register, dataUser }
})
