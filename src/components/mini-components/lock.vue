<template>
    <div class="lock" 
        :style="style" 
        @click.self="$store.state.lockShow = false"
    >
        <project-info></project-info>
    </div>
</template>

<script>
import projectInfo from './project-info.vue'
export default {
    name:'lock',
    props:{
        backgroundColor:{
            type:String,
            default:'rgba(0,0,0,0.3)'
        }
    },
    data(){
        return {

        }
    },
    computed:{
        style(){
            let height = window.innerHeight + 'px';
            return {
                backgroundColor:this.backgroundColor,
                height
            }
        }
    },
    components:{
        projectInfo
    }
}
</script>

<style lang="scss" scoped>
    .lock{
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
    }
</style>


