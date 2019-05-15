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
                        <strong>{{post.replyCount}}</strong> /
                        {{post.visitCount}}
                    </p>
                    <mark :class="post.tabClass">
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
            pageIndex:1,
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
            // console.log(this.pageIndex);
            let params = {
                        url:' https://cnodejs.org/api/v1/topics',
                        method:'get',
                        // limit:20*this.pageIndex,
                        page:this.pageIndex++,
                    };
            console.log(params);
            this.$http(params).then((response)=>{
                if(response.data.success === true){
                    console.log(response)
                    this.postLists = this.postLists.concat(response.data.data);
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
                    lastReplyTime:this.$Fn.spaceTime(post.last_reply_at),
                    tabClass:['post-list-tab',post.tab]
                }
            })
        }
    },
    created(){
        let vm = this;
        window.onscroll = function(){
            //变量scrollTop是滚动条滚动时，距离顶部的距离
       		var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
       		//变量windowHeight是可视区的高度
       		var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
       		//变量scrollHeight是滚动条的总高度
       		var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
                   //滚动条到底部的条件
            if(scrollTop+windowHeight==scrollHeight){
                    //写后台加载数据的函数
                vm.getData();
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .posts{
        font-size: 14px;
        width: 900px;
        margin: 50px auto 0 auto;
        border: 1px solid rgb(224, 224, 224);
        padding: 20px;
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
                     overflow: hidden;
                     line-height: 50px;
                     height: 50px;
                     margin-bottom: 20px;
                    .post-list-router-img{
                       float: left;
                       img{
                           width: 50px;
                           border-radius: 50%;
                       }
                    }
                    .post-list-visit,
                    .post-list-title,
                    .post-list-tab{
                        float: left;
                        margin-left:30px;
                    }
                    .post-list-visit{
                        width: 100px;
                        text-align: center;
                    }
                    .post-list-tab{
                        width: 50px;
                        text-align: center;
                        height: 40px;
                        line-height: 40px;
                        border-radius: 7px;
                        margin-top:5px;
                    }
                    .post-list-replyTime{
                        float: right;
                        margin-right: -30px;
                        width: 80px;
                        text-align: left;
                        color: #666;
                    }
                    .post-list-title{
                        overflow: hidden;
                        width: 500px;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        color: rgb(37, 195, 201)
                    }
                    .ask{
                        background-color: rgb(218, 215, 87);
                        color: #fff;
                    }
                    .good{
                        background-color: rgb(221, 130, 130);
                    }
                    .other{
                        background-color: yellow;
                    }
                    .share{
                        background-color: rgb(84, 194, 161);
                        color: #fff;
                    }
                    .job{
                        background: green;
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


