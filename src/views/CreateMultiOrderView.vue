<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { useOrderStore } from '@/stores/handleorder'
import { useModalStore } from '@/stores/modal'
import { MODAL_TYPE } from '@/constants'
import * as XLSX from 'xlsx'

const { openModal } = useModalStore()

const { addnew } = useOrderStore()
const submit = (order) => {
  addnew({
    supplierName: order[0],
    supplierPhoneNumber: order[1],
    supplierAddress: order[2],
    supplierEmail: order[3],
    recipientName: order[4],
    recipientPhone: order[5],
    recipientAddress: order[6],
    recipientEmail: order[7],
    recipientLongitude: `${order[8]}`,
    recipientLatitude: `${order[9]}`
  })
}

// Hàm validate name Sender
const validateName1 = (order) => {
  const name1 = order[0]
  let errorName = ''
  if (!name1) {
    errorName = 'Name is required'
  } else if (name1.length < 7) {
    errorName = 'At least 7 characters'
  } else {
    errorName = ''
  }
  return errorName
}
// Hàm validate phone Sender
const validatePhone1 = (order) => {
  const phone1 = order[1]
  let errorPhone = ''
  if (!phone1) {
    errorPhone = 'Phone is required'
  } else if (!/[0-9]/.test(phone1)) {
    errorPhone = 'Only contains number'
  } else if (phone1.length < 10) {
    errorPhone = 'Minimum 10 numbers'
  } else {
    errorPhone = ''
  }
  return errorPhone
}
// Hàm validate address Sender
const validateAdr1 = (order) => {
  const address1 = order[2]
  let errorAdr = ''
  if (!address1) {
    errorAdr = 'Address is required'
  } else {
    errorAdr = ''
  }
  return errorAdr
}
// Hàm validate email Sender
const validateEmail1 = (order) => {
  const email1 = order[3]
  let errorEmail = ''
  let mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  if (!email1) {
    errorEmail = 'Email is required'
  } else if (!mailFormat.test(email1)) {
    errorEmail = 'Email must be correct format ...@...'
  } else {
    errorEmail = ''
  }
  return errorEmail
}

// Hàm validate name Receiver
const validateName2 = (order) => {
  const name2 = order[4]
  let errorName = ''
  if (!name2) {
    errorName = 'Name is required'
  } else if (name2.length < 7) {
    errorName = 'At least 7 characters'
  } else {
    errorName = ''
  }
  return errorName
}
// Hàm validate phone Receiver
const validatePhone2 = (order) => {
  const phone2 = order[5]
  let errorPhone = ''
  if (!phone2) {
    errorPhone = 'Phone is required'
  } else if (!/[0-9]/.test(phone2)) {
    errorPhone = 'Only contains number'
  } else if (phone2.length < 10) {
    errorPhone = 'Minimum 10 numbers'
  } else {
    errorPhone = ''
  }
  return errorPhone
}
// Hàm validate address Receiver
const validateAdr2 = (order) => {
  const address2 = order[6]
  let errorAdr = ''
  if (!address2) {
    errorAdr = 'Address is required'
  } else {
    errorAdr = ''
  }
  return errorAdr
}
// Hàm validate email Receiver
const validateEmail2 = (order) => {
  const email2 = order[7]
  let errorEmail = ''
  let mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  if (!email2) {
    errorEmail = 'Email is required'
  } else if (!mailFormat.test(email2)) {
    errorEmail = 'Email must be correct format ...@...'
  } else {
    errorEmail = ''
  }
  return errorEmail
}
// Hàm validate Kinh độ
const validateKinhdo = (order) => {
  const longitude = order[8]
  let errorKinhdo = ''
  if (!longitude) {
    errorKinhdo = 'Required'
  } else {
    errorKinhdo = ''
  }
  return errorKinhdo
}
// Hàm validate Vĩ độ
const validateVido = (order) => {
  const latitude = order[9]
  let errorVido = ''
  if (!latitude) {
    errorVido = 'Required'
  } else {
    errorVido = ''
  }
  return errorVido
}

// Hàm checkForm
const checkCreate = (order) => {
  if (
    validateName1(order) !== '' ||
    validatePhone1(order) !== '' ||
    validateAdr1(order) !== '' ||
    validateEmail1(order) !== '' ||
    validateName2(order) !== '' ||
    validatePhone2(order) !== '' ||
    validateAdr2(order) !== '' ||
    validateEmail2(order) !== '' ||
    validateKinhdo(order) !== '' ||
    validateVido(order) !== ''
  ) {
    openModal({
      open: true,
      type: MODAL_TYPE.ERROR,
      title: 'Error',
      content: 'Cần nhập đúng định dạng form trước khi click Thêm mới.',
      okText: 'OK'
    })
  } else {
    submit(order)
    //Sau khi tạo đơn hàng mới thì xóa order đi(filter)
    listOrder.value = listOrder.value.filter(item => item !== order)
  }
}
const listOrder = ref([
    ['','','','','','','','','','',],['','','','','','','','','','',],
    ['','','','','','','','','','',],
])
const checkOrder = (order) =>{
  if(order[0]==='' && order[1]==='' && order[2]==='' && order[3]==='' && order[4]==='' && order[5]==='' &&
    order[6]==='' && order[7]==='' && order[8]==='' && order[9]===''){
    return false
  }return true
}
const count = ref(0)

//Hàm xử lý và upload file exel lên
const fileInput = ref(null)
const handleFileUpload = () => {
  const file = fileInput.value.files[0]
  if (file) {
    if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      const reader = new FileReader()
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result)
        const workbook = XLSX.read(data, { type: 'array' })
        const firstSheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[firstSheetName]
        const listData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })

        //Truyền cho formData
        listOrder.value = [...listOrder.value, ...listData]
        count.value = listOrder.value.length
      }
      reader.readAsArrayBuffer(file)
      openModal({
        open: true,
        type: MODAL_TYPE.SUCCESS,
        title: 'Success',
        content: 'Tải file tạo đơn hàng lên thành công.',
        okText: 'OK'
      })
    } else {
      openModal({
        open: true,
        type: MODAL_TYPE.ERROR,
        title: 'Error',
        content: 'Tải file lên thất bại -> Cần chọn file định dạng .xlsx .',
        okText: 'OK'
      })
    }
  }
}
const changeList = (id) => {
  listOrder.value = listOrder.value.filter((order,index) => index !== id)
  count.value--
}
const addOrder = () => {
  listOrder.value = [ ...listOrder.value, ['','','','','','','','','','',]]
  count.value++
}
const create = (listOrder) => {
  for(let i=0 ; i<count.value ; i++){
    if(listOrder[i+1] !== undefined){
      if(!checkOrder(listOrder[i]) && checkOrder(listOrder[i+1])){
        openModal ({
          open: true,
          type: MODAL_TYPE.ERROR,
          title: 'Error',
          content: `Những đơn hàng đầu không được để trống.`,
          okText: 'OK'
        })
        break;
      }else if(checkOrder(listOrder[i]) && checkOrder(listOrder[i+1])){
        setTimeout(() => {
          checkCreate(listOrder[i])
        }, i*1000);
      }else if(checkOrder(listOrder[i]) && !checkOrder(listOrder[i+1])){
        setTimeout(() => {
        checkCreate(listOrder[i])
        openModal ({  
          open: true,
          type: MODAL_TYPE.SUCCESS,
          title: 'Success',
          content: `Thêm mới list đơn hàng thành công.`,
          okText: 'OK'
        })
      }, i*1000);
      }
    }else{
      setTimeout(() => {
        checkCreate(listOrder[i])
        openModal ({  
          open: true,
          type: MODAL_TYPE.SUCCESS,
          title: 'Success',
          content: `Thêm mới list đơn hàng thành công.`,
          okText: 'OK'
        })
      }, i*1000);
    }
  }
}
</script>

<template>
  <div class="header">
    <RouterLink class="home" to="/createNew">
      <Icon icon="bi-box-arrow-left" />
      <div>Quay lại trang thêm mới</div>
    </RouterLink>
    <div class="exel">
      <input
        type="file"
        ref="fileInput"
        name="file"
        id="file"
        class="inputfile"
        @change="handleFileUpload()"
      />
      <label for="file">Tải file lên để thêm mới</label>
      <Icon icon="material-symbols:upload" width="20" height="20" />
    </div>
  </div>
  <div class="title">Thêm mới nhiều đơn hàng</div>
  <div class="information">
    <table>
      <thead>
        <tr>
          <th class="field">Tên NCC</th>
          <th class="field">Số điện thoại NCC</th>
          <th class="field">Địa chỉ NCC</th>
          <th class="field">Email NCC</th>
          <th class="field">Tên NN</th>
          <th class="field">Số điện thoại NN</th>
          <th class="field">Địa chỉ NN</th>
          <th class="field">Email NN</th>
          <th class="field">Kinh độ</th>
          <th class="field">Vĩ độ</th>
          <th class="field">Xóa</th>
        </tr>
      </thead>
      <tbody id="results">
        <tr v-for="(order, index) in listOrder" :key="index">
          <td class="data">
            <input type="text" style="width: 110px" v-model="order[0]" />
            <div class="form-error" :class="{ active: validateName1(order) }" v-if="checkOrder(order)">
              {{ validateName1(order) }}
            </div>
          </td>
          <td class="data">
            <input type="text" style="width: 140px" v-model="order[1]" />
            <div class="form-error" :class="{ active: validatePhone1(order) }" v-if="checkOrder(order)">
              {{ validatePhone1(order) }}
            </div>
          </td>
          <td class="data">
            <input type="text" style="width: 120px" v-model="order[2]" />
            <div class="form-error" :class="{ active: validateAdr1(order) }" v-if="checkOrder(order)">
              {{ validateAdr1(order) }}
            </div>
          </td>
          <td class="data">
            <input type="text" v-model="order[3]" />
            <div class="form-error" :class="{ active: validateEmail1(order) }" v-if="checkOrder(order)">
              {{ validateEmail1(order) }}
            </div>
          </td>
          <td class="data">
            <input type="text" style="width: 110px" v-model="order[4]" />
            <div class="form-error" :class="{ active: validateName2(order) }" v-if="checkOrder(order)">
              {{ validateName2(order) }}
            </div>
          </td>
          <td class="data">
            <input type="text" style="width: 140px" v-model="order[5]" />
            <div class="form-error" :class="{ active: validatePhone2(order) }" v-if="checkOrder(order)">
              {{ validatePhone2(order) }}
            </div>
          </td>
          <td class="data">
            <input type="text" style="width: 120px" v-model="order[6]" />
            <div class="form-error" :class="{ active: validateAdr2(order) }" v-if="checkOrder(order)">
              {{ validateAdr2(order) }}
            </div>
          </td>
          <td class="data">
            <input type="text" v-model="order[7]" />
            <div class="form-error" :class="{ active: validateEmail2(order) }" v-if="checkOrder(order)">
              {{ validateEmail2(order) }}
            </div>
          </td>
          <td class="data">
            <input type="text" style="width: 80px" v-model="order[8]" />
            <div class="form-error" :class="{ active: validateKinhdo(order) }" v-if="checkOrder(order)">
              {{ validateKinhdo(order) }}
            </div>
          </td>
          <td class="data">
            <input type="text" style="width: 80px" v-model="order[9]" />
            <div class="form-error" :class="{ active: validateVido(order) }" v-if="checkOrder(order)">
              {{ validateVido(order) }}
            </div>
          </td>
          <td class="data delete">
            <Icon icon="carbon:close-filled" @click="changeList(index)" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="option">
    <button class="clickadd" @click="addOrder()">+1 đơn trống</button>
  </div>
  <div class="button">
    <button @click="create(listOrder)">Thêm mới đơn hàng</button>
  </div>
</template>

<style lang="scss" scoped>
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
  align-items: center;
  padding: 30px 0 0 60px;
  margin-right: 25px;
}
thead th {
  position: sticky;
  top: 0;
  z-index: 1;
}
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 40px;
  margin-bottom: 30px;
}
.button > button {
  padding: 15px 23px 15px 23px;
  cursor: pointer;
  border-radius: 20px;
  font-size: 20px;
  margin-top: 35px;
  font-weight: bold;
  background-color: #3cd677;
}
.button > button:hover {
  background-color: #587957;
}
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 36px;
}
.option {
  display: flex;
  justify-content: flex-end;
  .clickadd {
    margin: 15px 50px 0 0;
    border-radius: 8px;
    margin-top: 20px;
    padding: 5px 10px 5px 10px;
    background-color: #3cd677;
    cursor: pointer;
  }
  .clickadd:hover{
    background-color: #587957;
  }
}
.delete {
  padding: 0 10px 0 10px !important;
  font-size: 16px;
  cursor: pointer;
}
.delete:hover {
  color: red;
}
.exel {
  color: white;
  background-color: rgb(197, 142, 40);
  border-radius: 15px;
  padding: 8px 14px 8px 14px;
  display: flex;
  align-items: center;
  gap: 5px;
  margin-right: 25px;
  border: 2px solid black;
}
.exel:hover {
  background-color: rgb(85, 56, 2);
}
.inputfile {
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}
.inputfile + label {
  font-weight: 700;
  cursor: pointer;
  font-size: 13.5px;
}
.information {
  display: flex;
  justify-content: center;
  max-height: 424px;
  overflow-y: auto;
}
table {
  width: 1450px;
  gap: 2px;
  border-collapse: separate;
  border-radius: 10px;
  border: 2px solid black;
  text-align: center;
  .field {
    padding: 6px 0px 6px 0px;
    background-color: #52b94e;
    font-weight: bold;
    border-radius: 8px;
    border: 2px solid black;
  }
  .data {
    background-color: rgba(207, 207, 207, 0.9);
    padding: 5px 0 5px 10px;
    vertical-align: inherit;
    align-items: center;
    position: relative;
    > input {
      background: none;
      border: none;
      font-size: 15px;
    }
  }
}
.form-error {
  color: red;
  top: 100%;
  font-size: 12px;
}
</style>
