<script setup>
import { RouterLink, RouterView } from 'vue-router'
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
