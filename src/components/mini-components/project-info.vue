<template>
    <div class="dialog" :style="style">
        <div class="dialog_header">
            <strong class="dialog_title">关于本项目</strong>
            <button class="dialog_close" @click="closeLock">X</button>
        </div>
        <ul class="dialog_body">
            <li>作者:<span class="special">kk4132</span></li>
            <li>源码:<span class="special">VueCnodeJS</span></li>
            <li><p>技术栈:</p>
                <ul class="stacks">
                    <li 
                        v-for="(stack,index) of stacks"
                        :key="index"
                    >{{stack}}</li>
                </ul>
            </li>
        </ul>
        <div class="dialog_footer">
            <button 
                class="dialog_footer_sure"
                @click="closeLock"
            >确定</button>
        </div>
    </div>
</template>

<script>
export default {
    name:'project-info',
    data(){
        return{
            stacks:['Vue','Vue-Router','VueX','Axios']
        }
    },
    computed:{
        style(){
            let margin = (window.innerHeight - 325)/2 + 'px';
            console.log(margin);
            return {
                margin:margin + ' auto'
            }
        }
    },
    methods:{
        closeLock(){
            this.$store.state.lockShow = false;
        }
    }
}
</script>

<style lang="scss" scoped>
    .dialog{
        background-color: rgba(255,255,255,1);
        width: 540px;
        height: 325px;
        padding: 20px;
        box-sizing: border-box;
        .dialog_header{
            .dialog_title{
                float: left;
            }
            .dialog_close{
                float: right;
                width: 20px;
                height: 20px;
                cursor: pointer;
                background-color:#fff;
                border: none;
            }
            .dialog_close:hover{
                background-color:#333;
                opacity: .3;
                color: #fff;
            }
        }
        .dialog_header::after{
            display: block;
            content:'';
            clear: both;
        }
        .dialog_body{
            line-height: 30px;
            margin-top: 20px;
            .special{
                color: #6ee0a7;
                margin-left:10px;
            }
            & > li{
                list-style: none;
                .stacks{
                    li{
                        list-style-type:disc ;
                        margin-left: 50px;
                    }
                }
            }
        }
        .dialog_footer{
            .dialog_footer_sure{
                float: right;
                border: none;
                border-radius: 5px;
                color: #fff;
                width: 70px;
                height: 50px;
                background-color: rgb(18, 157, 238);
            }
            .dialog_footer_sure:hover{
                opacity: .7;
                cursor: pointer; 
            }
        }
    }
</style>


