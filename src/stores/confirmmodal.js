import { defineStore } from 'pinia'
import { ref } from 'vue'

const useModalCfStore = defineStore('confirmmodal', () => {
  const dataModal = ref({
    isShow: false,
  })
  function click(isShow) {
    dataModal.value.isShow = isShow
  }
  return { dataModal , click}
})
export default useModalCfStore