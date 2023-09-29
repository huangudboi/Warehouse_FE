<script setup>
import useModalCfStore from '@/stores/confirmmodal'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import { getWareHouseAPI } from '@/api/search'
import { ref } from 'vue'

const store = useModalCfStore()
const { dataModal } = storeToRefs(store)
const closeModal = () => {
  dataModal.value.isShow = false
}
onMounted(() => {
  document.addEventListener('keyup', (event) => {
    if (event.key === 'Escape') {
      closeModal()
    }
  })
})

const warehouseData = ref([])

const getWareHouseData = async () => {
  const result = await getWareHouseAPI()
  warehouseData.value = result
  warehouseData.value.map((item) => ({ ...item, checked: false }))
}
getWareHouseData()

const emit = defineEmits(['updateListChoice'])
const confirm = () => {
  emit('updateListChoice', warehouseData.value.filter(item => item.checked))
}
</script>

<template>
  <div class="overlay2" v-if="dataModal.isShow">
    <div>
      <div class="header">
        <button class="confirm" @click="confirm(), closeModal()">Xác nhận</button>
        <button class="back" @click="closeModal()">
          <div>Thoát</div>
          <Icon icon="carbon:close-filled" />
        </button>
      </div>
      <div class="information">
        <table class="table">
          <thead>
            <tr>
              <th class="field">STT</th>
              <th class="field">Mã kho</th>
              <th class="field">Tên kho</th>
              <th class="field">Địa chỉ</th>
              <th class="field">Chọn</th>
            </tr>
          </thead>
          <tbody id="results">
            <tr v-for="wareHouse in warehouseData" :key="wareHouse.id">
              <td class="data">{{ wareHouse.id }}</td>
              <td class="data">{{ wareHouse.wareHouseCode }}</td>
              <td class="data">{{ wareHouse.name }}</td>
              <td class="data">{{ wareHouse.address }}</td>
              <td class="data">
                <input type="checkbox" class="getWareHouse" v-model="wareHouse.checked" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.overlay2 {
  font-family: 'Roboto', sans-serif;
  position: fixed;
  background: rgba($color: #000000, $alpha: 0.75);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
.header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 30px;
  gap: 5px;
  .confirm {
    background-color: green;
    cursor: pointer;
    border-radius: 15px;
    color: white;
    padding: 10px 12px 10px 12px;
  }
  .confirm:hover {
    background-color: rgb(2, 58, 2);
  }
  .back {
    display: flex;
    background-color: red;
    cursor: pointer;
    border-radius: 15px;
    color: white;
    padding: 10px 12px 10px 12px;
  }
  .back:hover {
    background-color: rgb(74, 2, 2);
  }
}
.information {
  display: flex;
  justify-content: center;
  max-height: 550px;
  overflow-y: auto;
  box-shadow: 0 0 20px 10px white;
}
thead th {
  position: sticky;
  top: 0;
}
.table {
  gap: 2px;
  border-collapse: separate;
  border-spacing: 2px;
  border-radius: 10px;
  border: 2px solid black;
  background-color: rgb(233, 225, 208);
  text-align: center;
  .field {
    padding: 6px 15px 6px 15px;
    background-color: orange;
    font-weight: bold;
    border-radius: 8px;
    border: 2px solid black;
  }
  .data {
    background-color: rgba(190, 189, 189, 0.9);
    padding: 12px 15px 12px 15px;
    vertical-align: inherit;
    align-items: center;
  }
}
</style>
