<template>
    <div 
        class="loading"
        :style="style"
    >
        <div class='content'>
            <span 
                v-for="(str,index) of content"
                :key="index"
                :class="{animate:currIndex === index?true:false}"
                @click="currIndex+=1"
            >{{str}}
            </span>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            content:[...'loading...'],
            currIndex:0
        }
    },
    computed:{
        style(){
            let height = window.innerHeight + 'px';
            return {
                height,
                backgroundColor:'rgba(30, 30, 30, .3)',
                lineHeight:height
            }
        }
    },
    mounted(){
        let count = this.content.length;
        let animating = ()=>{
            setTimeout(()=>{
                if(this.currIndex % count === 0){
                    this.currIndex = 0;
                }
                this.currIndex++;
                 animating();
            },1000)
        };
        animating();
    }
}
</script>

<style lang="scss" scoped>
    .loading{
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        .content{
            opacity: 1;
            color: rgb(0, 255, 200);
            margin: 0 auto;
            text-align: center;
            font-size: 40px;
            span{
                transition: transform .5;
            }
            .animate{
                display: inline-block;
                transform: scale(1.3)
            }
        }
    }
</style>


