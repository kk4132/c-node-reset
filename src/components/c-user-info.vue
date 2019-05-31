<template>
    <div class="userInfo">
            <div class="userInfo-header">
                <img :src="userData.avatar_url" />
                <p class="userName">{{userData.loginname}}</p>
                <p class="score">积分 : {{userData.score}}</p>
                <p class="GitHub">GitHub : <span>{{userData.githubUsername}}</span></p>
                <p class="creatDate">注册时间 : {{$Fn.spaceTime(userData.create_at)}}前</p>
            </div>
            <lists :datas="userData.recent_topics">
                    <template v-slot:title>最近创建的话题</template>
            </lists>
            <lists :datas="userData.recent_replies">
                    <template v-slot:title>最近参与的话题</template>
            </lists>
    </div>
</template>

<script>
import lists from './mini-components/lists'
export default {
    data(){
        return{
            userData:{}
        }
    },
    methods:{
        getData(){
            let url = `https://cnodejs.org/api/v1/user/${this.$route.params.loginname}`;
            this.$http({
                url,
                method:'get'
            }).then((response)=>{
                if(response.data.success === true){
                   this.userData = response.data.data;
                   console.log(this.userData) 
                }
            }).catch((error)=>{
                console.log(error);
            })
            
        }
    },
    created(){
        this.getData();
    },
    components:{
        lists
    }
}
</script>

<style lang="scss" scoped>
    .userInfo{
        width: 902px;
        // border: 1px solid #333;
        margin: 10px auto;
        box-sizing: border-box;
        font-size: 14px;
        .userInfo-header{
            border: 1px solid #ddd;
            border-radius: 10px;
            padding: 20px;
            img{
                width: 80px;
                border-radius: 10%;
                margin-right: 20px;
                float: left;
            }
            .userName{
                height: 80px;
                line-height: 80px;
                color: rgb(62, 240, 142)
            }
            p:not(.userName){
                height: 25px;
                line-height: 25px;
            }
            .GitHub{
                span{
                   color: rgb(62, 240, 142) 
                }
            }
        }
    }
</style>


