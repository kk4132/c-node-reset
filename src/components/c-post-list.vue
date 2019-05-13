<template>
    <div class="posts">
        <div class="post-header">
            <ul>
                <li v-for="(item,index) of postItems"
                    :key="index"
                    :class="isActive === index ? 'li_active':''"
                    @click="active(index)"
                >
                    {{item}}
                </li>
            </ul>
        </div>
        <div class="post-body">
            <ul>
                <li 
                    v-for="(list,index) of postLists"
                    :key="index"
                >
                    <router-link :to="{name:'user_info'}">
                        <img 
                            :src="list.author.avatar_url" 
                            :alt="list.author.loginname"
                        >
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            postItems:['全部','精华','分享','问答','招聘'],
            isActive:0,
            postLists:[]
        }
    },
    methods:{
        active(index){
            this.isActive = index;
        },
        getData(){
            this.$http({
                url:' https://cnodejs.org/api/v1/topics',
                method:'get',
                limit:'20',
                page:'1'
            }).then((response)=>{
                if(response.data.success === true){
                    console.log(response.data.data)
                    this.postLists = response.data.data;
                }
            }).catch((error)=>{
                console.log(error)
            })
        }
    },
    beforeMount(){
        this.getData();
    }
}
</script>

<style lang="scss" scoped>
    .posts{
        font-size: 14px;
        width: 900px;
        margin: 50px auto 0 auto;
        border: 1px solid #333;
        height: 900px;
        .post-header{
            padding: 20px;
            ul{
                height:30px;
                border-bottom:1px solid #eee;
                li{
                    float:left;
                    height:30px;
                    line-height: 30px;
                    margin-right: 30px;
                }
                li:hover{
                    color:rgb(15, 106, 241);
                }
            }
        }
        .post-body{

        }
    }
    li{
        list-style: none;
    }
    .li_active{
       color:rgb(15, 106, 241);
       border-bottom:1px solid rgb(15, 106, 241);  
    }
</style>


