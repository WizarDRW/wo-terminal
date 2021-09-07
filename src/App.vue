<template>
<h1>WO Terminal</h1>
<terminal></terminal>
</template>

<script>
import Terminal from './components/Terminal.vue'
export default {
  name: "App",
  components: {
    Terminal
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  justify-content: center;
}
</style>
