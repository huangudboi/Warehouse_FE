<script setup>
import { Icon } from '@iconify/vue'
import { useDetailStore } from '@/stores/detail'
import ModalConfirm from '@/components/ModalConfirm.vue'
import useModalCfStore from '@/stores/confirmmodal'
import { storeToRefs } from 'pinia'

const { click } = useModalCfStore()

const store = useDetailStore()
const { dataDetail } = storeToRefs(store)
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
</script>

<template>
  <header class="header">
    <RouterLink class="management" to="/management">
      <Icon icon="bi-box-arrow-left" />
      <div>Quay lại trang quản lí</div>
    </RouterLink>
    <div>
      <ModalConfirm />
      <button
        class="btn"
        @click="click(true)"
        v-show= "dataDetail.orderStatus !== 2 && dataDetail.orderStatus !== 3 && dataDetail.orderStatus !== 4"
      >
        Xác nhận đơn hàng
      </button>
    </div>
  </header>
  <div class="title">Chi tiết đơn hàng</div>
  <div class="tableOrder">
    <table class="table">
      <tbody id="order">
        <tr>
          <th class="field">Mã đơn hàng</th>
          <td class="data">{{ dataDetail.orderCode }}</td>
        </tr>
        <tr>
          <th class="field">Ngày tạo đơn</th>
          <td class="data">{{ formDate(dataDetail.createdDate) }}</td>
        </tr>
        <tr>
          <th class="field">Trạng thái</th>
          <td class="data">{{ statusString(dataDetail.orderStatus) }}</td>
        </tr>
      </tbody>
      <caption class="my-caption">
        Đơn hàng
      </caption>
    </table>
  </div>
  <div class="tableDetail" style="gap: 30px">
    <table class="table">
      <caption class="my-caption">
        Kho hàng
      </caption>
      <tbody id="order">
        <tr>
          <th class="field">Mã kho</th>
          <td class="data">{{ dataDetail?.warehouseCode || null }}</td>
        </tr>
        <tr>
          <th class="field">Tên kho</th>
          <td class="data">{{ dataDetail?.warehouseName || null }}</td>
        </tr>
        <tr>
          <th class="field">Địa chỉ kho</th>
          <td class="data">{{ dataDetail?.address || null }}</td>
        </tr>
        <tr>
          <th class="field">Ngày lưu kho</th>
          <td class="data">{{ formDate(dataDetail.storageTime) }}</td>
        </tr>
      </tbody>
    </table>
    <table class="table">
      <caption class="my-caption">
        Nhà cung cấp
      </caption>
      <tbody id="order">
        <tr>
          <th class="field">Tên NCC</th>
          <td class="data">{{ dataDetail.supplierName }}</td>
        </tr>
        <tr>
          <th class="field">Địa chỉ NCC</th>
          <td class="data">{{ dataDetail.supplierAddress }}</td>
        </tr>
        <tr>
          <th class="field">Số điện thoại NCC</th>
          <td class="data">{{ dataDetail.supplierPhoneNumber }}</td>
        </tr>
        <tr>
          <th class="field">Email</th>
          <td class="data">{{ dataDetail.supplierEmail }}</td>
        </tr>
      </tbody>
    </table>
    <table class="table">
      <caption class="my-caption">
        Người nhận
      </caption>
      <tbody id="order">
        <tr>
          <th class="field">Tên NN</th>
          <td class="data">{{ dataDetail.recipientName }}</td>
        </tr>
        <tr>
          <th class="field">Địa chỉ NN</th>
          <td class="data">{{ dataDetail.recipientAddress }}</td>
        </tr>
        <tr>
          <th class="field">Số điện thoại NN</th>
          <td class="data">{{ dataDetail.recipientPhone }}</td>
        </tr>
        <tr>
          <th class="field">Email</th>
          <td class="data">{{ dataDetail.recipientEmail }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="tableHistory">
    <table class="table">
      <caption class="my-caption">
        Lịch sử đơn hàng
      </caption>
      <thead>
        <tr>
          <th class="field">Thời gian</th>
          <th class="field">Trạng thái đơn hàng</th>
          <th class="field" style="width: 300px;">Lý do</th>
        </tr>
      </thead>
      <tbody id="history">
        <tr v-for="history in dataDetail.orderHistoryList" :key="history.id">
          <td class="data">{{ formDate(history.createdDate) }}</td>
          <td class="data">{{ statusString(history.orderStatus) }}</td>
          <td class="data">{{ history.missReason?.name || null }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.tableHistory,
.tableDetail,
.tableOrder {
  display: flex;
  justify-content: center;
  align-items: center;
}

.management {
  display: flex;
  align-items: center;
  font-size: 19px;
  color: rgb(0, 0, 0);
  text-decoration: none;
  transition: 0.5s;
  gap: 5px;
}
.management:hover {
  color: orange;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 0 0 60px;
  margin-right: 20px;
  .btn {
    cursor: pointer;
    border-radius: 20px;
    padding: 10px 10px 10px 10px;
    margin-right: 40px;
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
.table {
  border: 2px solid black;
  border-collapse: collapse;
  margin-bottom: 30px;
  .my-caption {
    background-color: rgb(144, 101, 22) !important;
    color: white;
    padding: 10px;
    caption-side: top;
    border: 2px solid black;
    border-bottom: none;
    font-weight: bold;
  }
  .field {
    padding: 6px 12px 6px 12px;
    background-color: orange;
    font-weight: bold;
    border: 2px solid black;
  }
  .data {
    background-color: rgba(207, 207, 207, 0.9);
    padding: 12px 15px 12px 15px;
    vertical-align: inherit;
    border: 2px solid black;
  }
}
</style>
