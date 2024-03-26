<script setup>

import Header_for_login_and_register from "@/components/header_for_login_and_register.vue";
import Footer from "@/components/Footer.vue";
import Overlay from "@/components/Overlay.vue";
import Register_form from "@/views/register/register_form.vue";
</script>

<template>
  <div id="RegisterPage">
    <header_for_login_and_register/>
    <register_form/>
    <div style="flex:1 auto"></div>
    <Footer/>
  </div>
  <Overlay/>
</template>

<style src="../special_assets/css/register_MAINPageStyles.css" scoped>

</style>
