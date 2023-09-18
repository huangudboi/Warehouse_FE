<script setup>
import { RouterLink, RouterView } from 'vue-router'
import BaseModal from '@/components/BaseModal.vue'
import BaseLoading from '@/components/BaseLoading.vue'

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
