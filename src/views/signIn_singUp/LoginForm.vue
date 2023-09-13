<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
//Giá trị các ô input khi người dùng nhập
const formData = ref({
  userName: '',
  passWord: '',
  wareHouseCode: ''
})
const formError = ref({
  userName: '',
  passWord: '',
  wareHouseCode: ''
})

//Hàm @input cho mỗi ô input, khi nhập thì sẽ tắt validate lỗi.
const removeValidate = (itemKey) => {
  formError.value[itemKey] = ''
}
// Hàm validate User
const validateUser = () => {
  const userValue = formData.value.userName
  let errorUser = ''
  if (!userValue) {
    errorUser = 'Username is required'
  } else if (userValue.length < 10) {
    errorUser = 'User haves at least 10 characters'
  } else {
    errorUser = ''
  }
  formError.value.userName = errorUser
}
// Hàm validate Pass
const validatePass = () => {
  const passValue = formData.value.passWord
  let errorPass = ''
  if (!passValue) {
    errorPass = 'Password is required'
  } else {
    errorPass = ''
  }
  formError.value.passWord = errorPass
}

const validateCode = () => {
  const codeValue = formData.value.wareHouseCode
  let errorCode = ''
  if (!codeValue) {
    errorCode = 'Password is required'
  } else {
    errorCode = ''
  }
  formError.value.wareHouseCode = errorCode
}

const showPass = ref('unhide')

const clickShowPass = () => {
  if (showPass.value === 'unhide') {
    showPass.value = ''
  } else {
    showPass.value = 'unhide'
  }
}

//Object này chứa các hàm validate của các trường
const validateRules = {
  userName: { validator: validateUser },
  passWord: { validator: validatePass },
  wareHouseCode: { validator: validateCode }
}
const handleValidate = () => {
  Object.keys(validateRules).forEach((key) => {
    if (validateRules[key]?.validator && typeof validateRules[key]?.validator === 'function') {
      validateRules[key].validator()
    }
  })
}
const checkAccount = () => {
  handleValidate() // chạy hàm validate trước khi submit form
  let isValidated = true
  Object.keys(formError.value).forEach((itemKey) => {
    if (formError.value[itemKey] !== '') {
      isValidated = false
    }
  })
  if (isValidated) {
    console.log('checkLogin') // Chạy hàm Login check Account
  } else {
    console.log('you have to complete validate')
  }
}
</script>

<template>
  <div class="background">
    <div class="form">
      <p>Login</p>
      <div class="information">
        <div class="text">
          <div class="label">USER NAME</div>
          <input
            type="text"
            id="useName"
            v-model="formData.userName"
            @blur="validateRules.userName.validator()"
            @input="removeValidate('userName')"
            placeholder="Enter username"
          />
          <div class="form-error" :class="{ active: formError.userName }">
            {{ formError.userName }}
          </div>
        </div>
        <div class="text">
          <div class="label">PASSWORD</div>
          <input
            class="passWord"
            :class="{ unhide: showPass === 'unhide' }"
            type="text"
            id="passWord"
            v-model="formData.passWord"
            @blur="validateRules.passWord.validator()"
            @input="removeValidate('passWord')"
            placeholder="Enter password"
          />
          <Icon class="icon" icon="fluent:eye-20-filled" @click="clickShowPass()" />
          <div class="form-error" :class="{ active: formError.passWord }">
            {{ formError.passWord }}
          </div>
        </div>
        <div class="text">
          <div class="label">WAREHOUSE CODE</div>
          <input
            type="text"
            id="wareHouseCode"
            v-model="formData.wareHouseCode"
            @blur="validateRules.wareHouseCode.validator()"
            @input="removeValidate('wareHouseCode')"
            placeholder="Enter warehouse code"
          />
          <div class="form-error" :class="{ active: formError.wareHouseCode }">
            {{ formError.wareHouseCode }}
          </div>
        </div>
      </div>
      <div class="action">
        <button class="button" @click="checkAccount">Login</button>
      </div>
      <div class="newAccount">
        <div>Don't have an account?</div>
        <RouterLink class="register" to="/register">Register</RouterLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,100&display=swap');

.background {
  background-image: url(http://10.1.39.14:8080/img/warehouse.cc1c16cf.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.form {
  font-family: 'Roboto', sans-serif;
  height: max-content;
  padding: 20px 50px;
  border-radius: 10px;
  background: rgba(14, 13, 13, 0.832);
  border: 2px solid black;
  backdrop-filter: blur(4px);

  .information {
    .text {
      padding: 4px 0;
      outline: none;
      border-bottom: 1px solid white;
      font-size: 15px;
      position: relative;
    }
  }
  .button {
    border: none;
    padding: 10px 120px;
    cursor: pointer;
    border-radius: 20px;
    font-size: 20px;
    margin-top: 35px;
    margin-bottom: 0px;
    font-weight: bold;
    display: inline-block;
  }
  .newAccount {
    display: flex;
    margin-top: 3px;
    list-style: none;
    justify-content: center;
    color: white !important;
    gap: 5px;
  }
}

.register {
  color: white;
  font-weight: bold;
  text-decoration: none;
  transition: 0.5s;
  &:hover {
    text-decoration: underline;
  }
}

.label {
  color: white;
  margin: 35px 0 0px;
  font-size: 15px;
  letter-spacing: 1px;
}

.text > input {
  background: none;
  padding-top: 5px;
  padding-bottom: 5px;
  width: 350px;
  font-size: 24px;
  outline: none;
  color: white;
  border: none;

  &::placeholder {
    font-size: 17px;
  }
}

.form > p {
  color: white;
  text-align: center;
  padding-top: 5px;
  font-size: 40px;
  font-weight: bold;
}

.action > button:hover {
  background-color: orange;
}

.form > p:hover {
  color: orange;
}

.form-error {
  color: red;
  top: 100%;
  position: absolute;
}

.action {
  display: flex;
  justify-content: center;
}

.unhide {
  -webkit-text-security: disc !important;
}

.icon {
  color: white;
  font-size: 25px;
}
</style>
