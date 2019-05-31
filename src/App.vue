<template>
  <div id="app">
    <c-header></c-header>
    <router-view name="main"></router-view>
    <router-view name="sidebar"></router-view>
  </div>
</template>

<script>
import cHeader from './components/c-header.vue'
export default {
  data(){
    return{

    }
  },
  components:{
    cHeader
  }
}
</script>

<style lang="scss">
  *{
    margin: 0;
    padding: 0;
  }
  a{
    text-decoration: none;
  }
  li{
    list-style: none;
  };
  .fade-enter-active,.fade-leave-active{
    transition: opacity .5s;
  }
  .fade-enter,.fade-leave-to{
    opacity: 0;
  }
</style>
