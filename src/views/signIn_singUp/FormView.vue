<script setup>
import LoginForm from '@/LoginForm.vue';
import RegisterForm from '@/RegisterForm.vue';

const props = defineProps({
    isLoginScreen: {
        type: Boolean,
        default: true,
    }
})

</script>

<template>
    <LoginForm v-if="props.isLoginScreen"/>
    <RegisterForm v-else/>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,100&display=swap');
.background {
  background-image: url(@/assets/images/warehouse.cc1c16cf.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style> 