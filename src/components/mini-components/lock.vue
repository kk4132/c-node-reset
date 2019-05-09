<template>
    <div class="lock" :style="style"></div>
</template>

<script>
export default {
    name:'lock',
    props:{
        backgroundColor:{
            type:String,
            default:'black'
        },
        opacity:{
            type:String,
            default:'.3'
        }
    },
    data(){
        return {

        }
    },
    computed:{
        style(){
            let height = document.body.clientHeight;
            console.log(height)
            return {
                backgroundColor:this.backgroundColor,
                opacity:this.opacity,
                height
            }
        }
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


