<template>
  <AppNavbar/>
  <div>
      <router-view></router-view>
  </div>
  <AppFooter/>
</template>

<script>
import AppNavbar from './components/AppNavbar.vue'
import AppFooter from './components/AppFooter.vue'

export default {
  name: 'App',
  components: {
    AppNavbar,
    AppFooter
  },

  mounted: function() {
    window.electronAPI.goToPage((_event, value) => {
        this.$router.push(value);
    });
  }
}
</script>

<style>
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
</style>
