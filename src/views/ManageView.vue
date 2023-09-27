<script setup>
import { Icon } from '@iconify/vue'
import { ref, computed, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { searchAPI } from '@/api/search'
import { useDetailStore } from '@/stores/detail'
import { useOrderStore } from '@/stores/handleorder'
import { createLabelAPI } from '@/api/report/index'
import { useModalStore } from '@/stores/modal'
import { MODAL_TYPE } from '@/constants'

const {openModal} = useModalStore()

const { getData } = useDetailStore()
const detail = (id) => {
  getData (id)
}

const datas = ref([])
const datasRender = ref([])

const { deleteOrder } = useOrderStore()

const currentPage = ref(1)
const sizePage = ref(5)
const sumPage = ref(0)
const changeSumPage = () => {
  sumPage.value = Math.ceil(datasRender.value.length / sizePage.value)
}
watch(sumPage, (newValue, oldValue) => {
  if (newValue !== oldValue) currentPage.value = 1
})

const listData = computed(() => {
  return datasRender.value.slice(
    (currentPage.value - 1) * sizePage.value,
    currentPage.value * sizePage.value
  )
})

const searchData = async () => {
  const result = await searchAPI()
  datas.value = result.content
  datasRender.value = result.content
  datasRender.value.map((item) => ({ ...item, checked: false }))
  sumPage.value = Math.ceil(datas.value.length / sizePage.value)
}
searchData()

const deteleData = (oderCode) => {
  deleteOrder(oderCode)
  datasRender.value = datasRender.value.filter((data) => data.orderCode !== oderCode)
  datas.value = datas.value.filter((data) => data.orderCode !== oderCode)
}

const formDate = (date) => {
  return new Date(date).toLocaleString('en-GB')
}
const statusString = (status) => {
  if (status === 0) return 'Đơn hàng mới'
  if (status === 1) return 'Lưu kho'
  if (status === 2) return 'Giao hàng thành công'
  if (status === 3) return 'Giao hàng thất bại'
  if (status === 4) return 'Hoàn hàng'
}
const selectAllChecked = ref(false)

const selectAll = () => {
  var checkboxes = document.querySelectorAll('.getOrderCode')
  if (selectAllChecked.value) {
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false
    })
  } else {
    checkboxes.forEach((checkbox) => {
      checkbox.checked = true
    })
  }
  selectAllChecked.value = !selectAllChecked.value
}

const searchOrder = ref({
  orderCode: '',
  wareHouseCode: '',
  phoneNumber: '',
  status: -1
})
const toggleSearchOrder = () => {
  let dataSearch = JSON.parse(JSON.stringify(datas.value))
  if (searchOrder.value.status != -1) {
    dataSearch = dataSearch.filter((data) => data.status == searchOrder.value.status)
  }
  if (searchOrder.value.orderCode !== '') {
    dataSearch = dataSearch.filter((data) => {
      return data.orderCode === searchOrder.value.orderCode
    })
  }
  if (searchOrder.value.wareHouseCode !== '') {
    dataSearch = dataSearch.filter(
      (data) => data.wareHouse?.wareHouseCode === searchOrder.value.wareHouseCode
    )
  }
  if (searchOrder.value.phoneNumber !== '') {
    dataSearch = dataSearch.filter(
      (data) =>
        data.supplier.phoneNumber === searchOrder.value.phoneNumber ||
        data.recipientPhone === searchOrder.value.phoneNumber
    )
  }
  datasRender.value = dataSearch
  if (Math.round(datasRender.value.length / sizePage.value) >= 1)
    sumPage.value = Math.round(datasRender.value.length / sizePage.value)
  else sumPage.value = 1
}

const listExport = ref([])
const params = ref({
  listOrderCode: [],
})
const clickExport = async () => {
  listExport.value = datasRender.value.filter(item => item.checked)
  if(listExport.value.length === 0){
    openModal({
      open: true,
      type: MODAL_TYPE.ERROR,
      title: 'Error',
      content: 'Chưa có đơn hàng nào được chọn.',
      okText: 'OK'
    })
  }else{
    for(let i=0 ; i<listExport.value.length ; i++){
      params.value.listOrderCode[i] = listExport.value[i].orderCode
    }
    const response = await createLabelAPI(params.value)
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
      let filename = `FileLabel_${formattedDate}.xlsx`

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
        content: 'Tải label đơn hàng thành công.',
        okText: 'OK'
      })
    }
  }
  datasRender.value.forEach((element) => {
    if (element.checked === true) {
      element.checked = false
    }
  })
}
</script>

<template>
  <div class="header">
    <RouterLink class="home" to="/">
      <Icon icon="bi-box-arrow-left" />
      <div>Quay lại trang chủ</div>
    </RouterLink>
    <div>
      <button class="btn" @click="clickExport()">Xuất mã đơn hàng</button>
      <button class="btn">Điều phối đơn hàng</button>
      <button class="btn">Xóa các đơn hàng đã chọn</button>
    </div>
  </div>
  <div class="title">Quản lí đơn hàng</div>
  <div class="search">
    <input
      type="text"
      id="orderCode"
      name="orderCode"
      v-model="searchOrder.orderCode"
      placeholder="Mã đơn hàng"
    />
    <input
      type="text"
      id="wareHouseCode"
      name="wareHouseCode"
      v-model="searchOrder.wareHouseCode"
      placeholder="Mã kho hàng"
    />
    <input
      type="text"
      id="phoneNumber"
      name="phoneNumber"
      v-model="searchOrder.phoneNumber"
      placeholder="Số điện thoại"
    />
    <select id="status" name="status" v-model="searchOrder.status">
      <option type="checkbox" value="-1">Tất cả</option>
      <option type="checkbox" value="0">Đơn hàng mới</option>
      <option type="checkbox" value="1">Lưu kho</option>
      <option type="checkbox" value="2">Giao hàng thành công</option>
      <option type="checkbox" value="3">Giao hàng thất bại</option>
      <option type="checkbox" value="4">Hoàn hàng</option>
    </select>
    <Icon icon="icomoon-free:search" width="24px" height="24px" @click="toggleSearchOrder()" />
  </div>
  <div class="information">
    <table>
      <thead>
        <tr>
          <th class="field">STT</th>
          <th class="field">Mã đơn hàng</th>
          <th class="field">Ngày tạo</th>
          <th class="field">Trạng thái</th>
          <th class="field">Mã kho</th>
          <th class="field">Tên NCC</th>
          <th class="field">Số điện thoại NCC</th>
          <th class="field">Tên NN</th>
          <th class="field">Số điện thoại NN</th>
          <th class="field">Thao tác</th>
          <th class="field">
            <button class="selectAll" @click="selectAll()">Chọn all</button>
          </th>
        </tr>
      </thead>
      <tbody id="results">
        <tr v-for="(data, index) in listData" :key="data.id">
          <td class="data">{{ index + 1 }}</td>
          <td class="data">{{ data.orderCode }}</td>
          <td class="data">{{ formDate(data.createdTime) }}</td>
          <td class="data">{{ statusString(data.status) }}</td>
          <td class="data">{{ data.wareHouse?.wareHouseCode || null }}</td>
          <td class="data">{{ data.supplier.name }}</td>
          <td class="data">{{ data.supplier.phoneNumber }}</td>
          <td class="data">{{ data.recipientName }}</td>
          <td class="data">{{ data.recipientPhone }}</td>
          <td class="data">
            <RouterLink class="btn_show detailOrder" to="/detailOrder" @click="detail(data.orderCode)"
              >Chi tiết</RouterLink
            >
            <button id="data.orderCode" class="btn_delete" @click="deteleData(data.orderCode)">
              Xóa
            </button>
          </td>
          <td class="data">
            <input
              type="checkbox"
              class="getOrderCode"
              value="${data.orderCode}"
              :disabled="data.status === 0"
              v-model="data.checked"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="choice">
    <label for="sizePage">Kích thước trang:</label>
    <select id="sizePage" name="sizePage" v-model="sizePage" @click="changeSumPage()">
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="20">20</option>
      <option value="50">50</option>
      <option value="100">100</option>
    </select>
  </div>
  <div class="page">
    <button id="previousPage" @click="currentPage--" :disabled="currentPage === 1">
      &laquo; Trang trước
    </button>
    <span id="currentPage">Trang {{ currentPage }}/{{ sumPage }}</span>
    <button id="nextPage" @click="currentPage++" :disabled="currentPage === sumPage">
      Trang sau &raquo;
    </button>
  </div>
</template>

<style scoped>
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
.header {
  display: flex;
  justify-content: space-between;
  padding: 30px 0 0 60px;
  margin-right: 20px;
  .btn {
    cursor: pointer;
    border-radius: 20px;
    padding: 10px 10px 10px 10px;
    margin-right: 5px;
    background-color: rgb(197, 142, 40);
    color: white;
  }
  .btn:hover {
    background-color: rgb(85, 56, 2);
  }
}

.title {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 50px;
  margin-bottom: 25px;
}
.search {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  margin-bottom: 30px;
}
.search > input {
  width: 300px;
  height: 30px;
  border-radius: 20px;
  padding: 0 10px;
}
.search > select {
  height: 30px;
  padding: 5px;
  border-radius: 20px;
  border: 2px solid black;
}
.choice {
  display: flex;
  justify-content: flex-end;
  margin: 15px 100px 0 0;
  > select {
    border-radius: 15px;
    padding: 1px 5px 1px 5px;
  }
}
.information {
  display: flex;
  justify-content: center;
  max-height: 424px;
  overflow-y: auto;
}
thead th {
  position: sticky;
  top: 0;
}
table {
  width: 1400px;
  gap: 2px;
  border-collapse: separate;
  border-radius: 10px;
  border: 2px solid black;
  text-align: center;
  .field {
    padding: 6px 8px 6px 8px;
    background-color: orange;
    font-weight: bold;
    border-radius: 8px;
    border: 2px solid black;
  }
  .selectAll {
    font-weight: bold;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 14.5px;
  }
  .data {
    background-color: rgba(207, 207, 207, 0.9);
    padding: 12px 0 12px 0;
    vertical-align: inherit;
    align-items: center;
    .btn_show {
      background-color: green;
      padding: 7px 5px 10px 5px;
      border-radius: 20px;
      font-size: 13px;
      color: white;
      margin-left: 5px;
      cursor: pointer;
      text-decoration: none;
      border: 2px solid black;
    }
    .btn_show:hover {
      background-color: rgb(2, 58, 2);
    }
    .btn_delete {
      background-color: red;
      padding: 10px;
      border-radius: 20px;
      color: white;
      margin-left: 5px;
      cursor: pointer;
    }
    .btn_delete:hover {
      background-color: rgb(74, 2, 2);
    }
  }
}
.page {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  > button {
    padding: 5px 5px 5px 5px;
    border-radius: 20px;
    background-color: chocolate;
    cursor: pointer;
    width: 100px;
  }
}
</style>
