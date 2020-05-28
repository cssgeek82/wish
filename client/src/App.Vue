<template>
  <div id="app">
    <WishComponent />
  </div>
</template>

<script>
import WishComponent from './components/WishComponent.vue'

export default {
  name: 'App',
  components: {
    WishComponent
  }
}
</script>

<style>
#app {
  font-family: Arial, Helvetica, sans-serif; 
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #11272c;
  margin: 0;
  padding: 0; 
}
</style>