<script setup>
import { Icon } from '@iconify/vue';
import {ref,computed} from 'vue'
import { RouterLink } from 'vue-router'
import { searchAPI } from '@/api/search'
import { useDetailStore } from '@/stores/detail'

const { getData } = useDetailStore()

const datas = ref([])

const currentPage = ref(1);
const sizePage = ref(5);
const sumPage = ref(0);
const changeSumPage = () => {
  sumPage.value = Math.round(datas.value.length/(sizePage.value));
  currentPage.value = 1
}

const dataRender=computed(()=>{
  return datas.value.slice((currentPage.value-1)*sizePage.value,currentPage.value*sizePage.value)
})


const searchData = async () => {
  const result = await searchAPI();
  datas.value = result.content;
  sumPage.value = Math.round(datas.value.length/(sizePage.value));
}
searchData()

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
const selectAllChecked = ref(false);

const selectAll = () => {
  var checkboxes = document.querySelectorAll(".getOrderCode");
  if (selectAllChecked.value) {
      checkboxes.forEach( (checkbox) => {
          checkbox.checked = false;
      });
  } else {
      checkboxes.forEach( (checkbox) => {
          checkbox.checked = true;
      });
  }
  selectAllChecked.value = !selectAllChecked.value;
}

</script>

<template>
<body class="overlay">
  <div class="header">
    <RouterLink class="home" to="/">
      <Icon icon="bi-box-arrow-left" />
      <div>Quay lại trang chủ</div>
    </RouterLink>
    <div>
      <button class="btn">Xuất mã đơn hàng</button>
      <button class="btn">Sửa đổi trạng thái đơn hàng</button>
      <button class="btn">Xóa các đơn hàng đã chọn</button>
    </div>
  </div>
  <div class="title">Quản lí đơn hàng</div>
  <div class="search">
    <input 
      type="text" 
      id="orderCode" 
      name="orderCode" 
      placeholder="Mã đơn hàng"
    />
    <input 
      type="text" 
      id="orderCode" 
      name="orderCode" 
      placeholder="Mã kho hàng"
    />
    <input 
      type="text" 
      id="orderCode" 
      name="orderCode" 
      placeholder="Số điện thoại"
    />
    <select id="status" name="status">
        <option type="checkbox" value="-1">Tất cả</option>
        <option type="checkbox" value="0">Đơn hàng mới</option>
        <option type="checkbox" value="1">Lưu kho</option>
        <option type="checkbox" value="2">Giao hàng thành công</option>
        <option type="checkbox" value="3">Giao hàng thất bại</option>
        <option type="checkbox" value="4">Hoàn hàng</option>
    </select>
    <Icon icon="icomoon-free:search" width="24px" height="24px"/>
  </div>
  <div class="information">
    <table class="table">
      <thead>
        <tr>
          <th class="field">STT</th>
          <th class="field">Mã đơn hàng</th>
          <th class="field">Ngày tạo</th>
          <th class="field">Trạng thái</th>
          <th class="field">Mã kho</th>
          <th class="field">Tên NCC</th>
          <th class="field">Số điện thoại NCC</th>
          <th class="field">Tên Người nhận</th>
          <th class="field">Số điện thoại NN</th>
          <th class="field">Thao tác</th>
          <th class="field">
            <button class="selectAll" @click="selectAll()">Chọn all</button>
          </th>
        </tr>
      </thead>
      <tbody id="results">
        <tr v-for="(data,index) in dataRender" :key="data.id">
          <td class="data">{{ index+1 }}</td>
          <td class="data">{{ data.orderCode }}</td>
          <td class="data">{{ formDate(data.createdTime) }}</td>
          <td class="data">{{ statusString(data.status) }}</td>
          <td class="data">{{ data.wareHouse.wareHouseCode }}</td>
          <td class="data">{{ data.supplier.name }}</td>
          <td class="data">{{ data.supplier.phoneNumber }}</td>
          <td class="data">{{ data.recipientName }}</td>
          <td class="data">{{ data.recipientPhone }}</td>
          <td class="data">
            <RouterLink class="btn_show detailOrder" to="/detailOrder" @click="getData(data)">Chi tiết</RouterLink>
            <button id="data.orderCode" class="btn_delete">Xóa</button>
          </td>
          <td class="data">
            <input type="checkbox" class="getOrderCode" value=${data.orderCode}>
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
    <button id="previousPage" @click="currentPage--" :disabled="currentPage===1">&laquo; Trang trước</button>
    <span id="currentPage">Trang {{ currentPage }}/{{ sumPage }}</span>
    <button id="nextPage" @click="currentPage++" :disabled="currentPage===sumPage">Trang sau &raquo;</button>
  </div>
</body>
</template>

<style scoped>
.overlay{
  background-color: rgb(233,225,208);
  color: black;
}
.home{
  display: flex;
  align-items: center;
  font-size: 19px;
  color: rgb(0, 0, 0);
  text-decoration: none;
  transition: 0.5s;
  gap: 5px;
}
.home:hover{
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
    margin-right: 5px;
    background-color: rgb(197, 142, 40);
    color: white;
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
.search >input {
  width: 300px;
  height: 30px;
  border-radius: 20px;
  padding: 0 10px;
}
.search >select{
  height: 30px;
  padding: 5px;
  border-radius: 20px;
  border: 2px solid black;
}
.choice {
  display: flex;
  justify-content: flex-end;
  margin: 15px 100px 0 0;
  >select{
    border-radius: 15px;
    padding: 1px 5px 1px 5px;
  }
}
.information {
  display: flex;
  justify-content: center;
  align-items: center;
}
.table{
  width: 1400px;
  gap: 2px;
  border-collapse: separate; 
  border-spacing: 2px;
  border-radius: 10px;
  border: 2px solid black;
  background: none;
  text-align: center;
  .field{
    padding: 6px 8px 6px 8px ;
    background-color: orange;
    font-weight: bold;
    border-radius: 8px;
    border: 2px solid black;
  }
  .selectAll{
    font-weight: bold;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 14.5px;
  }
  .data{
    background-color: rgba(207, 207, 207, 0.9);
    padding: 12px 0 12px 0;
    vertical-align: inherit;
    align-items: center;
    .btn_show{
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
    .btn_delete{
      background-color: red;
      padding: 10px;
      border-radius: 20px;
      color: white;
      margin-left: 5px;
      cursor: pointer;
    }
  }
}
.page{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  padding-bottom: 20px;
  >button {
    padding: 5px 5px 5px 5px; 
    border-radius: 20px;
    background-color: chocolate;
    cursor: pointer;
    width: 100px;
  }
}
</style>