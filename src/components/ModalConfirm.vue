<script setup>
import useModalCfStore from '@/stores/confirmmodal'
import { storeToRefs } from 'pinia'
import { Icon } from '@iconify/vue'
import { ref } from 'vue'
import { useOrderStore } from '@/stores/handleorder'
import { useDetailStore } from '@/stores/detail'
const { getData } = useDetailStore()

const { changeOrder } = useOrderStore()

const { dataDetail } = useDetailStore()

const formData = ref({
  orderCode: dataDetail.orderCode,
  type: null,
  missReasonId: null,
})

const store = useModalCfStore()
const { dataModal } = storeToRefs(store)
const closeModal = () => {
  dataModal.value.isShow = false
}
const currentTime = new Date().toLocaleString('en-GB')

const btn_back = ref(null)
const btn_success = ref(null)
const btn_fail = ref(null)

const getBack = () => {
  btn_fail.value = null
  btn_success.value = null
}

const getSuccess = () => {
  btn_fail.value = null
  btn_back.value = null
}

const getFail = () => {
  btn_success.value = null
  btn_back.value = null
}
const uncheckAllOrderCodes = () => {
  formData.value.missReasonId = null
  formData.value.type = null
}
const submit = (formData) => {
  changeOrder({
    orderCode: formData.orderCode,
    type: formData.type,
    missReasonId: formData.missReasonId
  })
  getData(dataDetail.orderCode)
}
</script>

<template>
  <div class="overlay2" v-if="dataModal.isShow">
    <div class="modal_content">
      <div class="modal_header">
        <h1 class="title">Xác nhận đơn hàng</h1>
        <div id="timenow">
          <div>{{ currentTime }}</div>
        </div>
      </div>
      <div class="modal_body">
        <div>
          <input
            type="radio"
            @click="getBack()"
            class="checkbox"
            value="back"
            id="typeBack"
            v-model="formData.type"
          />
          <label for="typeBack">Hoàn hàng</label>
        </div>
        <div>
          <input
            type="radio"
            @click="getSuccess()"
            class="checkbox"
            value="success"
            id="typeSuccess"
            v-model="formData.type"
          />
          <label for="typeSuccess">Giao hàng thành công</label>
        </div>
        <div>
          <input
            type="radio"
            @click="getFail()"
            class="checkbox"
            value="fail"
            id="typeFail"
            v-model="formData.type"
          />
          <label for="typeFail">Giao hàng thất bại</label>
          <p></p>
          <select
            id="failreason"
            class="failreason"
            v-if="formData.type === 'fail'"
            v-model="formData.missReasonId"
          >
            <option value="">--- Chọn lý do ---</option>
            <option value="LD1">Khách hàng vắng, hẹn giao sau</option>
            <option value="LD2">Không liên hệ được với khách hàng</option>
            <option value="LD3">Từ chối nhận vì hàng không như mô tả</option>
            <option value="LD4">Từ chối nhận vì kiện hàng rách/móp</option>
            <option value="LD5">Lý do khác</option>
          </select>
        </div>
      </div>
      <div class="modal_footer">
        <button class="confirm" @click="submit(formData), closeModal()">Xác nhận</button>
        <button class="back" @click="closeModal(), uncheckAllOrderCodes()">
          <div>Thoát</div>
          <Icon icon="carbon:close-filled" />
        </button>
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
}
.modal_content {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 600px;
  background-color: #fff;
  border-radius: 0.3rem;
  justify-content: center;
  border: 2px solid black;
  box-shadow: 0 0 20px 10px white;
  margin-bottom: 300px;
}
.modal_header {
  display: block;
  justify-content: center !important;
  align-items: center !important;
  background-color: orange;
  padding: 10px 0 30px 30px;
  .title {
    font-size: 30px;
    font-weight: bold;
  }
}
.modal_body {
  position: relative;
  flex: 1 1 auto;
  padding: 10px 0 20px 30px;
  border-bottom: 1px solid rgb(76, 75, 75);
  .failreason {
    border: 2px solid black;
    padding: 7px 20px 7px 10px;
    border-radius: 20px;
    width: max-content;
    margin-top: 10px;
    font-size: 14px;
  }
}
.modal_footer {
  display: flex;
  justify-content: flex-end;
  padding: 20px 20px 20px 0;
  gap: 5px;
}
.confirm {
  background-color: green;
  cursor: pointer;
  border-radius: 15px;
  color: white;
  padding: 10px 12px 10px 12px;
}
.confirm:hover{
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
.back:hover{
  background-color: rgb(74, 2, 2);
}
</style>
