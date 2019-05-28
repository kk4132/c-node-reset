<template>
    <div class="userInfo">
            <div class="userInfo-header">
                <img :src="userData.avatar_url">
                <p class="userName">{{userData.loginname}}</p>
                <p class="score">积分 : {{userData.score}}</p>
                <p class="GitHub">GitHub : <span>{{userData.githubUsername}}</span></p>
                <p class="creatDate">注册时间 : {{$Fn.spaceTime(userData.create_at)}}前</p>
            </div>
            <div class="userInfo-body"></div>
            <div class="userInfo-rooter"></div>
    </div>
</template>

<script>
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
                }
            }).catch((error)=>{
                console.log(error);
            })
            
        }
    },
    created(){
        this.getData();
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


