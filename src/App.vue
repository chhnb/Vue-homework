<template>
  <div>
<!--    <router-link to="/">Login</router-link>-->
    <!--    <router-link to="/reg" style="margin-left: 10px">Register</router-link>-->
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components:{}
}

</script>
<style >
#app{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: url("./assets/background3.jpg");
  background-repeat:no-repeat;
  background-attachment:fixed;
  background-position:center center;
  background-size: cover;
  /*background-size: auto;
  background-size: 1200px 685px;*/
}
</style>
