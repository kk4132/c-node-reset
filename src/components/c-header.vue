<template>
    <div class="c-header">
        <div class="warp">
            <router-link :to="{name:'root'}">
                <img src="../assets/cnodejs_light.svg" alt="back root page">
            </router-link>
            <span @click="$store.state.lockShow = true">关于</span>
        </div>
        <lock></lock>
    </div>
</template>

<script>
import lock from './mini-components/lock.vue'
export default {
    name:'cHeader',
    data(){
        return {
            aboutShowVal:false
        }
    },
    components:{
        lock
    },
    methods:{
        lockDisplay(event){
            console.log(event);
        }
    }
}
</script>

<style lang="scss" scoped>
    .c-header{
        position: relative;
        background-color: #413c3c;
        height: 50px;
        .warp{
            margin: 0 auto;
            width: 1080px;
            a{
                float: left;
                img{
                width: 120px;
                margin-top:10px;
                }
            }
            span{
                float: right;
                color: #fff;
                cursor: pointer;
                line-height: 50px;
            }
        }
    }
</style>
