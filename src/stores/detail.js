import { defineStore } from 'pinia'
import { ref } from 'vue'

const defaultState = {
    orderCode: '',
    fullName: '',
    status: ''
}

export const useDetailStore = defineStore('detail', () => {
    const dataDetail = ref({ ...defaultState })
    const getData = (params) => {
      dataDetail.value = { ...dataDetail.value, ...params }
    }
    return { dataDetail, getData}
})