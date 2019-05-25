<template>
    <div 
        class="loading"
        :style="style"
    >
        <div class='content'>
            <span 
                v-for="(str,index) of content"
                :key="index"
                :class="['str',{animate:currIndex === index?true:false}]"
                @click="currIndex+=1"
            >{{str}}
            </span>
        </div>
        <div 
            class="dot"
            :style="dotStyle"
        >
                <span 
                    v-for="i of 16"
                    :key="i"
                    :style="circleStyle(i)"
                >
                </span>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            content:[...'loading'],
            currIndex:0
            // equal:0,
            // styles:new Array(5).fill({})
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
        },
        dotStyle(){
            let centerY = window.innerHeight/2 + 'px',
                centerX = window.innerWidth/2 + 'px';
            return {
                top:centerY,
                left:centerX
            }
        }
    },
    mounted(){
        let count = this.content.length;
        let animating = ()=>{
            setTimeout(()=>{
                this.currIndex+=1;
                this.currIndex = this.currIndex % count;
                // if(this.equal === 0){
                //     this.equal = 1;
                // }else{
                //    this.equal = 0; 
                // }
                // console.log(this.equal); 
                animating();
            },100)
        };
        animating();
    },
    methods:{
        circleStyle(i){
            let angle = (i - 1) * 22.5,
                left = 0,
                top = 0,
                radian = angle * Math.PI * 2 / 360;
            left = Math.sin(radian) * 150 - 10 + 'px';
            top = Math.cos(radian) * 150 - 10 + 'px';
            return {
                left,
                top,
                opacity:i/16
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .loading{
        position: absolute;
        width: 100%;
        top: 0;
        .content{
            opacity: 1;
            color: rgb(0, 255, 200);
            margin: 0 auto;
            text-align: center;
            font-size: 40px;
            .str{
                transition: transform .5;
                display: inline-block;
                // display: none;
            }
            .animate{
                transform: scale(1.5);
                transition: transform 0.1s;
            }
        }
        .dot{
            position: absolute;
            margin: 0;
            padding: 0;
            transform-origin:50% 50%;
            border: 1px solid #fff;
            // height: 300px;
            // width: 300px;
            animation: rotate 5s linear infinite;
            span{
                margin: 0;
                padding: 0;
                display: inline-block;
                position: absolute;
                height: 20px;
                width: 20px;
                border-radius: 50%;
                background: rgb(0, 255, 200);
            }
        }
        @keyframes rotate{from{transform: rotate(0deg)}
            to{transform: rotate(359deg)}
        }
    }
</style>


