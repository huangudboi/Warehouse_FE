<script setup>
import { Icon } from '@iconify/vue';
import { useDetailStore } from '@/stores/detail'

const { dataDetail } = useDetailStore()
const formDate = (date) => {
  return (new Date(date)).toLocaleString("en-GB")
}
const statusString = (status) =>{
  if(status===0)
    return "Đơn hàng mới";
  if(status===1)
    return "Lưu kho";
  if(status===2)
    return "Giao hàng thành công";
  if(status===3)
    return "Giao hàng thất bại";
  if(status===4)
    return "Hoàn hàng";
}

</script>

<template>
<body class="overlay">
    <header class="header">
        <RouterLink class="management" to="/management">
          <Icon icon="bi-box-arrow-left" />
          <div>Quay lại trang quản lí</div>
        </RouterLink>
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
                    <td class="data">{{ formDate(dataDetail.createdTime) }}</td>
                </tr>
                <tr>
                    <th class="field">Trạng thái</th>
                    <td class="data">{{ statusString(dataDetail.status) }}</td>
                </tr>
            </tbody>
            <caption class="my-caption">Đơn hàng</caption>
        </table>
    </div>
    <div class="tableDetail" style="gap: 30px;">
        <table class="table">
            <caption class="my-caption">Kho hàng</caption>
            <tbody id="order">
                <tr>
                    <th class="field">Mã kho</th>
                    <td class="data">{{ dataDetail.wareHouse.wareHouseCode }}</td>
                </tr>
                <tr>
                    <th class="field">Tên kho</th>
                    <td class="data">{{ dataDetail.wareHouse.name }}</td>
                </tr>
                <tr>
                    <th class="field">Địa chỉ kho</th>
                    <td class="data">{{ dataDetail.wareHouse.address }}</td>
                </tr>
                <tr>
                    <th class="field">Ngày lưu kho</th>
                    <td class="data">{{ formDate(dataDetail.storageTime) }}</td>
                </tr>
            </tbody>
        </table>
        <table class="table">
            <caption class="my-caption">Nhà cung cấp</caption>
            <tbody id="order">
                <tr>
                    <th class="field">Tên NCC</th>
                    <td class="data">{{ dataDetail.supplier.name }}</td>
                </tr>
                <tr>
                    <th class="field">Địa chỉ NCC</th>
                    <td class="data">{{ dataDetail.supplier.address }}</td>
                </tr>
                <tr>
                    <th class="field">Số điện thoại NCC</th>
                    <td class="data">{{ dataDetail.supplier.phoneNumber }}</td>
                </tr>
                <tr>
                    <th class="field">Email</th>
                    <td class="data">{{ dataDetail.supplier.email }}</td>
                </tr>
            </tbody>
        </table>
        <table class="table">
            <caption class="my-caption">Người nhận</caption>
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
            <thead>
                <caption class="my-caption">Lịch sử đơn hàng</caption>
            </thead>
            <thead>
                <tr>
                    <th class="field">Thời gian</th>
                    <th class="field">Trạng thái đơn hàng</th>
                    <th class="field">Lý do</th>
                </tr>
            </thead>
            <tbody id="history">
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    </div>
</body>
</template>

<style scoped>
.overlay{
  background-color: rgb(233,225,208);
  color: black;
  >div{
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.management{
  display: flex;
  align-items: center;
  font-size: 19px;
  color: rgb(0, 0, 0);
  text-decoration: none;
  transition: 0.5s;
  gap: 5px;
}
.management:hover{
  color: orange;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 0 0 60px;
  margin-right: 20px;
}
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 50px;
  margin-bottom: 25px;
}
.table{
    border: 2px solid black;
    border-collapse: collapse;
    margin-bottom: 30px;
    .my-caption{
        background-color: rgb(144, 101, 22) !important;
        color: white;
        padding: 10px;
        caption-side: top;
        border: 2px solid black;
        border-bottom: none;
        font-weight: bold;
    }
    .field{
        padding: 6px 12px 6px 12px ;
        background-color: orange;
        font-weight: bold;
        border: 2px solid black;
    }
    .data{
        background-color: rgba(207, 207, 207, 0.9);
        padding: 12px 15px 12px 15px;
        vertical-align: inherit;
        border: 2px solid black;
    }
}
</style>
  