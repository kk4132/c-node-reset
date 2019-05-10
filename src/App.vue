<template>
  <div id="app">
    <c-header></c-header>
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
  .fade-enter-active,.fade-leave-active{
    transition: opacity .5s;
  }
  .fade-enter,.fade-leave-to{
    opacity: 0;
  }
</style>
