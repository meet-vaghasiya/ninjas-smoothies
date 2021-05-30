<template>
  <div id="app">
    <navbar></navbar>
    <router-view />
  </div>
</template>

<script>
import Index from "./components/Index";
import Navbar from "./components/Navbar.vue";

export default {
  components: {
    Index,
    Navbar
  }
};
</script>

<style>
#app {
  margin-top: 60px;
}
</style>
