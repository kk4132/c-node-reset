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
                    v-for="(post,index) of filterPosts"
                    :key="index"
                >
                    <router-link 
                        class="post-list-router-img"
                        :to="{name:'user_info'}">
                        <img 
                            :src="post.imgUrl" 
                            :alt="post.loginName"
                        >
                    </router-link>
                    <p class="post-list-visit">
                        <em>{{post.replyCount}}</em> /
                        {{post.visitCount}}
                    </p>
                    <mark class="post-list-tab">
                        {{post.tab}}
                    </mark>
                    <h4 class="post-list-title">{{post.title}}</h4>
                    <span class="post-list-replyTime">
                        {{post.lastReplyTime+'前'}}
                    </span>
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
            postLists:[],
            dealDataFn:{
                getTab(tab){
                    let result = '';
                    if(tab === 'share'){
                        result = '分享'
                    }else if(tab === 'ask'){
                        result = '问答'
                    }else if(tab === 'job'){
                        result = '招聘'
                    }else if(tab === 'good'){
                        result = '精华'
                    }else{
                        result = '其他'
                    }
                    return result;
                }
            }
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
    },
    computed:{
        filterPosts(){
            return this.postLists.map((post)=>{
                return {
                    title:post.title,
                    imgUrl:post.author.avatar_url,
                    loginName:post.author.loginname,
                    replyCount:post.reply_count,
                    visitCount:post.visit_count,
                    tab:this.dealDataFn.getTab(post.tab),
                    lastReplyTime:this.$Fn.spaceTime(post.last_reply_at)
                }
            })
        }
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
            ul{
                li{
                    padding: 0;
                    border:1px solid #666;
                    margin-bottom: 10px;
                    height: 50px;
                    line-height: 50px;
                    .post-list-router-img{
                        float: left;
                        img{
                            width: 50px;
                            border-radius: 50%;
                            margin-right: 30px;
                        }
                    }
                    .post-list-visit,
                    .post-list-title,
                    .post-list-tab,
                    .post-list-replyTime{
                        display: inline-block;
                    }  
                }
            }
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


