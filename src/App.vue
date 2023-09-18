<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { onMounted } from 'vue';
import BaseModal from '@/components/BaseModal.vue'
import BaseLoading from '@/components/BaseLoading.vue'
const { login } = useAuthStore()

const submit = () => {
  login({
    userName: 'vuongpq1',
    password: '12345678',
    wareHouseCode: 'Zy00'
  })
}
onMounted(() => {
  submit()
})


</script>

<template>
  <header>
    <nav class="nav-routes">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/login">Login</RouterLink>
    </nav>
  </header>
  <RouterView />
  <BaseLoading />
  <BaseModal />
</template>

<style scoped>
.nav-routes {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-right: 20px;
  color: white;
}
</style>
