<script setup>
  // import { RouterLink, RouterView } from 'vue-router'  
</script>

<template>
  <!-- <header class="background">
    <nav class="nav-routes">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/login">Login</RouterLink>
    </nav>
  </header>
  <RouterView /> -->
  <div >
    <h1>This is Home Page</h1>
  </div>
</template>

<style scoped>

.background {
  background-color: rgb(231, 204, 204);
  width: 100%;
  height: 100%;
  min-height: 100vh;
}

.nav-routes {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-right: 20px;
  color: white;
}
</style>
