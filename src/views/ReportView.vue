<script setup>
import { Icon } from '@iconify/vue'
import WarehouseChoice from '@/components/WarehouseChoice.vue'
import useModalCfStore from '@/stores/confirmmodal'
import { ref } from 'vue'
import { reportTotalAPI, efficiencyAPI } from '@/api/report/index'
import { useModalStore } from '@/stores/modal'
import { MODAL_TYPE } from '@/constants'

const { openModal } = useModalStore()

const { click } = useModalCfStore()

const listChoice = ref([])
const updateListChoice = (list) => {
  listChoice.value = [...list]
}
const changeList = (index) => {
  listChoice.value[index].checked = false
  listChoice.value = listChoice.value.filter((item) => item.checked)
}

const requestParams = ref({
  endTime: '',
  listWarehouseId: [],
  startTime: '',
  type: ''
})

const check = ref(0)

const total = async (params) => {
  // Make an API request to download the file
  const response = await reportTotalAPI(params)
  if (response) {
    //file name
    let today = new Date()
    let year = today.getFullYear()
    let month = today.getMonth() + 1
    let day = today.getDate()
    if (month < 10) {
      month = '0' + month
    }
    if (day < 10) {
      day = '0' + day
    }
    let formattedDate = year + '' + month + '' + day
    let filename = `ReportNumberOrder_${formattedDate}.xlsx`
    //download file
    const blob = new Blob([response])
    const link = document.createElement('a')
    link.style.display = 'none'
    link.href = window.URL.createObjectURL(blob)
    link.download = filename
    link.click()
    window.URL.revokeObjectURL(link.href)

    openModal({
      open: true,
      type: MODAL_TYPE.SUCCESS,
      title: 'Success',
      content: 'Tải báo cáo số lượng đơn hàng thành công.',
      okText: 'OK'
    })
  }
  listChoice.value = []
  check.value = 0
  requestParams.value.startTime = ''
  requestParams.value.endTime = ''
}
const efficiency = async (params) => {
  const response = await efficiencyAPI(params)
  if (response) {
    //file name
    let today = new Date()
    let year = today.getFullYear()
    let month = today.getMonth() + 1
    let day = today.getDate()
    if (month < 10) {
      month = '0' + month
    }
    if (day < 10) {
      day = '0' + day
    }
    let formattedDate = year + '' + month + '' + day
    let filename = `ReportEfficiency_${formattedDate}.xlsx`
    //download file
    const blob = new Blob([response])
    const link = document.createElement('a')
    link.style.display = 'none'
    link.href = window.URL.createObjectURL(blob)
    link.download = filename
    link.click()
    window.URL.revokeObjectURL(link.href)

    openModal({
      open: true,
      type: MODAL_TYPE.SUCCESS,
      title: 'Success',
      content: 'Tải báo cáo hiệu suất giao đơn hàng thành công.',
      okText: 'OK'
    })
  }
  listChoice.value = []
  check.value = 0
  requestParams.value.startTime = ''
  requestParams.value.endTime = ''
}

const clickExport = async () => {
  if (listChoice.value.length === 0) {
    openModal({
      open: true,
      type: MODAL_TYPE.ERROR,
      title: 'Error',
      content: 'Chưa có mã kho nào được chọn.',
      okText: 'OK'
    })
  } else {
    for (let i = 0; i < listChoice.value.length; i++) {
      requestParams.value.listWarehouseId[i] = listChoice.value[i].id
    }
    if (!requestParams.value.endTime && !requestParams.value.startTime) {
      openModal({
        open: true,
        type: MODAL_TYPE.ERROR,
        title: 'Error',
        content: 'Cần nhập ngày tháng xuất báo cáo.',
        okText: 'OK'
      })
    } else {
      const start = new Date(requestParams.value.startTime)
      const end = new Date(requestParams.value.endTime)
      const timeDifference = end - start
      const time = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
      if (time > 15) {
        openModal({
          open: true,
          type: MODAL_TYPE.ERROR,
          title: 'Error',
          content: 'Khoảng thời gian suất báo cáo tối đa 15 ngày.',
          okText: 'OK'
        })
      } else {
        if (check.value == 1) {
          requestParams.value.type = 'DAY'
          total(requestParams.value)
        } else if (check.value == 2) {
          requestParams.value.type = 'MONTH'
          total(requestParams.value)
        } else if (check.value == 3) {
          requestParams.value.type = 'DAY'
          efficiency(requestParams.value)
        } else if (check.value == 4) {
          requestParams.value.type = 'MONTH'
          efficiency(requestParams.value)
        } else {
          openModal({
            open: true,
            type: MODAL_TYPE.ERROR,
            title: 'Error',
            content: 'Chưa chọn trạng thái xuất báo cáo.',
            okText: 'OK'
          })
        }
      }
    }
  }
}
</script>

<template>
  <div>
    <WarehouseChoice @updateListChoice="updateListChoice" />
    <div class="header">
      <RouterLink class="home" to="/">
        <Icon icon="bi-box-arrow-left" />
        <div>Quay lại trang chủ</div>
      </RouterLink>
    </div>
    <div class="title">Báo cáo thống kê đơn hàng</div>
    <div class="information">
      <div>
        <table class="table check">
          <tr>
            <th class="field">Báo cáo:</th>
            <th class="field">Xuất theo ngày</th>
            <th class="field">Xuất theo tháng</th>
          </tr>
          <tr>
            <th class="field">Tổng số lượng đơn hàng về các kho</th>
            <td class="data">
              <input type="radio" class="checked" name="checked" value="1" v-model="check" />
            </td>
            <td class="data">
              <input type="radio" class="checked" name="checked" value="2" v-model="check" />
            </td>
          </tr>
          <tr>
            <th class="field">Hiệu suất giao đơn hàng</th>
            <td class="data">
              <input type="radio" class="checked" name="checked" value="3" v-model="check" />
            </td>
            <td class="data">
              <input type="radio" class="checked" name="checked" value="4" v-model="check" />
            </td>
          </tr>
        </table>
        <div class="filter">
          <div style="display: flex; align-items: center; gap: 10px">
            <input type="date" class="date" v-model="requestParams.startTime" />
            <div>đến</div>
            <input type="date" class="date" v-model="requestParams.endTime" />
          </div>
          <div>
            <button class="red button" @click="click(true)">Chọn kho</button>
            <button class="green button" @click="clickExport()">Xác nhận</button>
          </div>
        </div>
      </div>
      <div class="warehouseSelect">
        <table class="table">
          <thead>
            <tr>
              <th class="field">STT</th>
              <th class="field">Mã kho</th>
              <th class="field">Tên kho</th>
              <th class="field">Xóa</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="listChoice.length === 0">
              <td colspan="4">Chưa có kho nào được chọn</td>
            </tr>
            <tr v-for="(item, index) in listChoice" :key="item.id">
              <td class="data">{{ index + 1 }}</td>
              <td class="data">{{ item.wareHouseCode }}</td>
              <td class="data">{{ item.name }}</td>
              <td class="data delete">
                <Icon icon="carbon:close-filled" @click="changeList(index)" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header {
  padding: 30px 0 30px 60px;
  margin-right: 20px;
}
.home {
  display: flex;
  align-items: center;
  font-size: 19px;
  color: rgb(0, 0, 0);
  text-decoration: none;
  transition: 0.5s;
  gap: 5px;
}
.home:hover {
  color: orange;
}
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 50px;
  margin-bottom: 70px;
}
.information {
  display: flex;
  justify-content: center;
  align-items: center;
}
.warehouseSelect {
  background-color: rgba(207, 207, 207, 0.9);
  border-radius: 14px;
  border: 2px solid black;
  margin-left: 30px;
  padding: 15px;
  height: 343px;
  overflow: auto;
}
.table {
  border-radius: 14px;
  border: 2px solid black;
  border-collapse: separate;
  text-align: center;
  background-color: rgb(228 228 228);
  border-spacing: 3px;
}
.check {
  width: 618px;
}
.field {
  padding: 7px 15px 7px 15px;
  background-color: orange;
  font-weight: bold;
  border-radius: 15px;
  border: 2px solid black;
}
.data {
  background-color: rgba(199, 197, 197, 0.9);
  padding: 5px 5px 5px 5px;
  vertical-align: inherit;
  align-items: center;
}
.choice {
  display: flex;
  flex-direction: column;
}
.filter {
  border-radius: 14px;
  border: 2px solid black;
  margin-top: 40px;
  width: 618px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: rgba(207, 207, 207, 0.9);
  .date {
    margin: 40px 0 40px 0;
    height: 30px;
    padding: 5px;
    border-radius: 15px;
    width: 120px;
    cursor: pointer;
    background-color: rgb(240, 240, 240);
  }
}
.button {
  margin: 0 0 20px 10px;
  padding: 7px 10px 7px 10px;
  border-radius: 15px;
  color: white;
  cursor: pointer;
}
.delete {
  cursor: pointer;
  :hover {
    background-color: brown;
  }
}
.checked {
  cursor: pointer;
}
.red {
  background-color: red;
}
.red:hover {
  background-color: rgb(74, 2, 2);
}
.green {
  background-color: green;
}
.green:hover {
  background-color: rgb(2, 58, 2);
}
</style>
