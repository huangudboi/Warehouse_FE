<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { useOrderStore } from '@/stores/handleorder'
import { useModalStore } from '@/stores/modal'
import { MODAL_TYPE } from '@/constants'

const { openModal } = useModalStore()

const { addnew } = useOrderStore()
const submit = (formData) => {
  addnew({
    supplierName: formData.value.nameSender,
    supplierPhoneNumber: formData.value.phoneSender,
    supplierAddress: formData.value.addressSender,
    supplierEmail: formData.value.emailSender,
    recipientName: formData.value.nameReceiver,
    recipientPhone: formData.value.phoneReceiver,
    recipientAddress: formData.value.addressReceiver,
    recipientEmail: formData.value.emailReceiver,
    recipientLongitude: formData.value.longitude,
    recipientLatitude: formData.value.latitude
  })
}
//Giá trị các ô input khi người dùng nhập
const formData = ref({
  nameSender: '',
  phoneSender: '',
  addressSender: '',
  emailSender: '',
  nameReceiver: '',
  phoneReceiver: '',
  addressReceiver: '',
  emailReceiver: '',
  longitude: '',
  latitude: ''
})
//Giá trị các ô input Receiver lỗi
const formError = ref({
  nameSender: '',
  phoneSender: '',
  addressSender: '',
  emailSender: '',
  nameReceiver: '',
  phoneReceiver: '',
  addressReceiver: '',
  emailReceiver: '',
  longitude: '',
  latitude: ''
})

//Hàm @input cho mỗi ô input, khi nhập thì sẽ tắt validate lỗi.
const removeValidate = (itemKey) => {
  formError.value[itemKey] = ''
}
// Hàm validate name Sender
const validateName1 = () => {
  const name1 = formData.value.nameSender
  let errorName = ''
  if (!name1) {
    errorName = 'Name is required'
  } else if (name1.length < 7) {
    errorName = 'Name haves at least 7 characters'
  } else {
    errorName = ''
  }
  formError.value.nameSender = errorName
}
// Hàm validate phone Sender
const validatePhone1 = () => {
  const phone1 = formData.value.phoneSender
  let errorPhone = ''
  if (!phone1) {
    errorPhone = 'Phone is required'
  } else if (!/[0-9]/.test(phone1)) {
    errorPhone = 'Phone only contains number'
  } else if (phone1.length < 10) {
    errorPhone = 'Phone haves minimum 10 numbers'
  } else {
    errorPhone = ''
  }
  formError.value.phoneSender = errorPhone
}
// Hàm validate address Receiver
const validateAdr1 = () => {
  const address1 = formData.value.addressSender
  let errorAdr = ''
  if (!address1) {
    errorAdr = 'Address is required'
  } else {
    errorAdr = ''
  }
  formError.value.addressSender = errorAdr
}
// Hàm validate email Receiver
const validateEmail1 = () => {
  const email1 = formData.value.emailSender
  let errorEmail = ''
  let mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  if (!email1) {
    errorEmail = 'Email is required'
  } else if (!mailFormat.test(email1)) {
    errorEmail = 'Email must be correct format ...@...'
  } else {
    errorEmail = ''
  }
  formError.value.emailSender = errorEmail
}

// Hàm validate name Receiver
const validateName2 = () => {
  const name2 = formData.value.nameReceiver
  let errorName = ''
  if (!name2) {
    errorName = 'Name is required'
  } else if (name2.length < 7) {
    errorName = 'Name haves at least 7 characters'
  } else {
    errorName = ''
  }
  formError.value.nameReceiver = errorName
}
// Hàm validate phone Receiver
const validatePhone2 = () => {
  const phone2 = formData.value.phoneReceiver
  let errorPhone = ''
  if (!phone2) {
    errorPhone = 'Phone is required'
  } else if (!/[0-9]/.test(phone2)) {
    errorPhone = 'Phone only contains number'
  } else if (phone2.length < 10) {
    errorPhone = 'Phone haves minimum 10 numbers'
  } else {
    errorPhone = ''
  }
  formError.value.phoneReceiver = errorPhone
}
// Hàm validate address Receiver
const validateAdr2 = () => {
  const address2 = formData.value.addressReceiver
  let errorAdr = ''
  if (!address2) {
    errorAdr = 'Address is required'
  } else {
    errorAdr = ''
  }
  formError.value.addressReceiver = errorAdr
}
// Hàm validate email Receiver
const validateEmail2 = () => {
  const email2 = formData.value.emailReceiver
  let errorEmail = ''
  let mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  if (!email2) {
    errorEmail = 'Email is required'
  } else if (!mailFormat.test(email2)) {
    errorEmail = 'Email must be correct format ...@...'
  } else {
    errorEmail = ''
  }
  formError.value.emailReceiver = errorEmail
}
// Hàm validate Kinh độ
const validateKinhdo = () => {
  const longitude = formData.value.longitude
  let errorKinhdo = ''
  if (!longitude) {
    errorKinhdo = 'Longitude is required'
  } else {
    errorKinhdo = ''
  }
  formError.value.longitude = errorKinhdo
}
// Hàm validate Vĩ độ
const validateVido = () => {
  const latitude = formData.value.latitude
  let errorVido = ''
  if (!latitude) {
    errorVido = 'Latitude is required'
  } else {
    errorVido = ''
  }
  formError.value.latitude = errorVido
}

//Object này chứa các hàm validate của các trường
const validateRules = {
  nameSender: { validator: validateName1 },
  phoneSender: { validator: validatePhone1 },
  addressSender: { validator: validateAdr1 },
  emailSender: { validator: validateEmail1 },
  nameReceiver: { validator: validateName2 },
  phoneReceiver: { validator: validatePhone2 },
  addressReceiver: { validator: validateAdr2 },
  emailReceiver: { validator: validateEmail2 },
  longitude: { validator: validateKinhdo },
  latitude: { validator: validateVido }
}
const handleValidate = () => {
  Object.keys(validateRules).forEach((key) => {
    if (validateRules[key]?.validator && typeof validateRules[key]?.validator === 'function') {
      validateRules[key].validator()
    }
  })
}

// Hàm checkLogin
const checkCreate = () => {
  handleValidate() // chạy hàm validate trước khi submit form
  let isValidated = true
  Object.keys(formError.value).forEach((itemKey) => {
    if (formError.value[itemKey] !== '') {
      isValidated = false
    }
  })
  if (isValidated) {
    submit(formData)
  } else {
    openModal({
      open: true,
      type: MODAL_TYPE.ERROR,
      title: 'Error',
      content: 'Cần nhập đúng định dạng form trước khi click Thêm mới.',
      okText: 'OK'
    })
  }
}
</script>

<template>
  <div class="header">
    <RouterLink class="home" to="/">
      <Icon icon="bi-box-arrow-left" />
      <div>Quay lại trang chủ</div>
    </RouterLink>
    <button class="exel">
      <div>Tải file lên để thêm mới</div>
      <Icon icon="material-symbols:upload" width="20" height="20" />
    </button>
  </div>
  <div class="title">Thêm mới đơn hàng</div>
  <div class="information">
    <div class="sender">
      <header class="name">Nhà cung cấp:</header>
      <div class="text">
        <div class="label">Tên NCC</div>
        <input
          type="text"
          id="nameSender"
          v-model="formData.nameSender"
          @blur="validateRules.nameSender.validator()"
          @input="removeValidate('nameSender')"
          placeholder="Enter fullname"
        />
        <div class="form-error" :class="{ active: formError.nameSender }">
          {{ formError.nameSender }}
        </div>
      </div>
      <div class="text">
        <div class="label">Số điện thoại NCC</div>
        <input
          type="text"
          id="phoneSender"
          v-model="formData.phoneSender"
          @blur="validateRules.phoneSender.validator()"
          @input="removeValidate('phoneSender')"
          placeholder="Enter phone"
        />
        <div class="form-error" :class="{ active: formError.phoneSender }">
          {{ formError.phoneSender }}
        </div>
      </div>
      <div class="text">
        <div class="label">Địa chỉ NCC</div>
        <input
          type="text"
          id="addressSender"
          v-model="formData.addressSender"
          @blur="validateRules.addressSender.validator()"
          @input="removeValidate('addressSender')"
          placeholder="Enter address"
        />
        <div class="form-error" :class="{ active: formError.addressSender }">
          {{ formError.addressSender }}
        </div>
      </div>
      <div class="text">
        <div class="label">Email NCC</div>
        <input
          type="text"
          id="emailSender"
          v-model="formData.emailSender"
          @blur="validateRules.emailSender.validator()"
          @input="removeValidate('emailSender')"
          placeholder="Enter email"
        />
        <div class="form-error" :class="{ active: formError.emailSender }">
          {{ formError.emailSender }}
        </div>
      </div>
    </div>
    <div class="receiver">
      <header class="name">Người nhận:</header>
      <div>
        <div class="inf">
          <div class="text">
            <div class="label">Tên NN</div>
            <input
              type="text"
              id="nameReceiver"
              v-model="formData.nameReceiver"
              @blur="validateRules.nameReceiver.validator()"
              @input="removeValidate('nameReceiver')"
              placeholder="Enter fullname"
            />
            <div class="form-error" :class="{ active: formError.nameReceiver }">
              {{ formError.nameReceiver }}
            </div>
          </div>
          <div class="text">
            <div class="label">Số điện thoại NN</div>
            <input
              type="text"
              id="phoneReceiver"
              v-model="formData.phoneReceiver"
              @blur="validateRules.phoneReceiver.validator()"
              @input="removeValidate('phoneReceiver')"
              placeholder="Enter phone"
            />
            <div class="form-error" :class="{ active: formError.phoneReceiver }">
              {{ formError.phoneReceiver }}
            </div>
          </div>
          <div class="text">
            <div class="label">Địa chỉ NN</div>
            <input
              type="text"
              id="addressReceiver"
              v-model="formData.addressReceiver"
              @blur="validateRules.addressReceiver.validator()"
              @input="removeValidate('addressReceiver')"
              placeholder="Enter address"
            />
            <div class="form-error" :class="{ active: formError.addressReceiver }">
              {{ formError.addressReceiver }}
            </div>
          </div>
          <div class="text">
            <div class="label">Email NN</div>
            <input
              type="text"
              id="emailReceiver"
              v-model="formData.emailReceiver"
              @blur="validateRules.emailReceiver.validator()"
              @input="removeValidate('emailReceiver')"
              placeholder="Enter email"
            />
            <div class="form-error" :class="{ active: formError.emailReceiver }">
              {{ formError.emailReceiver }}
            </div>
          </div>
        </div>
        <div class="Toado">
          <div class="text">
            <div class="label">Kinh độ</div>
            <input
              type="text"
              id="longitude"
              v-model="formData.longitude"
              @blur="validateRules.longitude.validator()"
              @input="removeValidate('longitude')"
              placeholder="Enter longitude"
            />
            <div class="form-error" :class="{ active: formError.longitude }">
              {{ formError.longitude }}
            </div>
          </div>
          <div class="text">
            <div class="label">Vĩ độ</div>
            <input
              type="text"
              id="latitude"
              v-model="formData.latitude"
              @blur="validateRules.latitude.validator()"
              @input="removeValidate('latitude')"
              placeholder="Enter latitude"
            />
            <div class="form-error" :class="{ active: formError.latitude }">
              {{ formError.latitude }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="button">
    <button @click="checkCreate()">Thêm mới</button>
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
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 50px;
  margin-bottom: 30px;
}
.name {
  font-size: 35px;
  font-weight: bold;
  color: orange;
  margin-bottom: 10px;
}
.information {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 100px;
}
.text {
  padding: 4px 0;
  border-bottom: 1px solid black;
  outline: none;
  font-size: 15px;
  position: relative;
  margin-bottom: 12px;
}
.button > button {
  padding: 16px 70px;
  cursor: pointer;
  border-radius: 20px;
  font-size: 20px;
  margin-top: 35px;
  font-weight: bold;
  background-color: orange;
}
.button > button:hover {
  background-color: rgb(188, 143, 51);
}
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 36px;
}
.label {
  margin: 10px 0 0px;
  font-size: 20px;
  letter-spacing: 1px;
  font-weight: bold;
}

.text > input {
  background: none;
  padding-top: 5px;
  padding-bottom: 5px;
  width: 300px;
  font-size: 18px;
  outline: none;
  border: none;

  &::placeholder {
    font-size: 14px;
  }
}

.receiver > div {
  display: flex;
  gap: 30px;
}
.form-error {
  color: red;
  top: 100%;
  position: absolute;
}

.exel {
  color: white;
  cursor: pointer;
  font-weight: 700;
  font-size: 10pt;
  border-width: 1px;
  background-color: rgb(197, 142, 40);
  border-radius: 3px;
  padding: 8px 10px;
  display: flex;
  align-items: center;
  gap: 5px;
  margin-right: 25px;
}
.exel:hover {
  background-color: rgb(85, 56, 2);
}
</style>
