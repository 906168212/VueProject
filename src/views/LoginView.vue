<script setup>

  import Footer from "@/components/Footer.vue";
  import Header_for_login_and_register from "@/components/header_for_login_and_register.vue";
  import Login_form from "@/views/login/login_form.vue";
  import Overlay from "@/components/Overlay.vue";


</script>

<template>
  <div id="loginPage">
    <header_for_login_and_register/>
    <login_form/>
    <div style="flex:1 auto"></div>
    <Footer/>
  </div>
  <Overlay/>
</template>

<style src="../special_assets/css/login_MainPageStyles.css" scoped>
</style>
