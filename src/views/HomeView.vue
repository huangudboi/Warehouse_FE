<script setup>
import { Icon } from '@iconify/vue'
import { RouterLink } from 'vue-router'
import { getLocalStorageByItem, removeLocalStorageByItem } from '@/constants/utils'
import { UserFilled } from '@element-plus/icons-vue'

const dataUser = getLocalStorageByItem('USER_LOGIN')
</script>

<template>
  <header class="header">
    <div class="title">
      <img src="@/assets/images/logo.jpg" alt="Logo" />
      <h2 class="nameheader">Kho hàng QHLD</h2>
    </div>
    <div class="router">
      <RouterLink class="report button" to="/report">Báo cáo thống kê</RouterLink>
      <RouterLink class="management button" to="/management">Quản lý đơn hàng</RouterLink>
      <RouterLink class="createNew button" to="/createNew">Thêm mới đơn hàng</RouterLink>
    </div>
    <div class="account">
      <div style="display: flex; gap: 3px; ">
        <div class="username">{{ dataUser.fullName }}</div>
        <el-avatar :icon="UserFilled" :size="28"/>
      </div>
      <RouterLink class="logout" to="/login" @click="removeLocalStorageByItem('USER_LOGIN')">
        <div>Logout</div>
        <Icon icon="uil:signout" />
      </RouterLink>
    </div>
  </header>
  <div class="imagebase">
    <img src="@/assets/images/khobai.jpg" alt="base" />
  </div>
  <div class="map">
    <img src="@/assets/images/mapVN.webp" alt="" />
    <div class="text">
      <h1>1000+</h1>
      <h2>kho hàng trải dài khắp đất nước và đang vươn ra thế giới.</h2>
    </div>
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5356.643977920997!2d105.77710716886466!3d21.015050713640793!2m3!1f0!
            2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3134550bffea91e3%3A0xfa3723e8105f2100!2zVOG7lW5nIGPDtG5nIHR5IFPDtG5nIMSQw6A!5e
            0!3m2!1svi!2s!4v1689589600644!5m2!1svi!2s"
      width="600px"
      height="500"
      style="border: 0"
      allowfullscreen=""
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    >
    </iframe>
  </div>
  <footer class="footer">
    <div class="information">
      <h1>Kho QHLD kính chào!</h1>
      <h2>
        Thành lập ngày 6/7/2023, với đội ngũ quản lý chuyên nghiệp sẽ vận chuyển những đơn hàng đến
        khách hàng nhanh chóng, an toàn, toàn vẹn. Cảm ơn đã luôn tin tưởng!
      </h2>
    </div>
    <div class="contact">
      <h1>Thông tin liên hệ:</h1>
      <div>
        <div>
          <div class="icon">
            <Icon icon="solar:phone-linear" style="font-size: 16px" />
            <h1>Số điện thoại:</h1>
          </div>
          <div class="icon">
            <Icon icon="mdi-light:home" style="font-size: 16px" />
            <h1>Địa chỉ:</h1>
          </div>
          <div class="icon">
            <Icon icon="ic:outline-attach-email" style="font-size: 14px" />
            <h1>Email:</h1>
          </div>
        </div>
        <div style="margin-top: 2px">
          <h2>0908300703</h2>
          <h2>Tháp A, tòa nhà Sông Đà, Mễ Trì, Nam Từ Liêm, Hà Nội</h2>
          <h2>nguyenbalam2306@gmail.com</h2>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: orange;
  height: 100px;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
}
.title {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-left: 80px;
}
.title > img {
  width: 70px;
  height: 70px;
  border-radius: 50%;
}
.title > h2 {
  font-weight: bold;
  font-size: 30px;
}
.nameheader:hover {
  color: rgb(253, 253, 253);
}
.button {
  background-color: rgba(0, 0, 0, 0.37);
  color: white;
  height: max-content;
  border-radius: 20px;
  padding: 13px 10px 13px 10px;
  border: none;
  margin-right: 10px;
  font-size: 15px;
  font-weight: bold;
  text-decoration: none;
}
.button:hover {
  background: none;
  color: black;
}
.account {
  padding-right: 100px;
  .username {
    font-size: 18px;
  }
}

.logout {
  display: flex;
  align-items: center;
  gap: 5px;
  color: black;
  text-decoration: none;
  transition: 0.5s;
  > div {
    font-weight: bold;
  }
}
.footer {
  background-color: rgb(5, 5, 5);
  height: 200px;
  border-radius: 30px 30px 0 0;
  color: white;
  font-size: 7px;
  display: flex;
  justify-content: space-around;
  font-size: 10px;
}
.imagebase > img {
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
  height: 75%;
  width: 75%;
  margin-top: 20px;
  margin-bottom: 20px;
}
.map {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}
.map > img {
  height: 500px;
}
.text {
  padding-top: 50px;
  padding-right: 60px;
  height: 500px;
  width: 200px;
  background: white;
}
.text > h1 {
  font-size: 50px;
}
.text > h2 {
  font-size: 25px;
}
.information {
  margin-top: 25px;
  width: 370px;
}
.information > h1 {
  font-weight: bold;
  color: orange;
  margin-bottom: 25px;
}
.contact > div {
  display: flex;
  gap: 50px;
}
.contact > h1 {
  font-weight: bold;
  color: orange;
  margin-top: 25px;
  margin-bottom: 25px;
}
.icon {
  display: flex;
  align-items: center;
  font-size: 8px;
  color: orange;
  gap: 5px;
}
.map > iframe {
  width: 565px;
}
</style>
