<template>
    <div>
        <load v-if="loading"></load>
        <div class="posts" v-else>
            <div class="post-header">
                <ul>
                    <li v-for="(item,index) of postItems"
                        :key="index"
                        :class="isActive === index ? 'li_active':''"
                        @click="switchTab(index,item.keyEN)"
                    >
                        {{item.keyZH}}
                    </li>
                </ul>
            </div>
            <div class="post-footer">
                <ul>
                    <li class="prev" @click="prevPage">&lt;&lt;</li>
                    <li 
                        class="ellipsis" 
                        v-show="pages[0] >= 3?true:false"
                        key="prev_ell"
                    >...</li>
                    <transition-group name="fade">
                    <li 
                        v-for="(page,index) of pages"
                        :key="index"
                        @click="currParams.page = page"
                        :class="{pageActvie:currPage===page?true:false}"
                    >
                        {{page}}
                    </li>
                    </transition-group>
                    <li class="ellipsis" key="next_ell">...</li>
                    <li class="next" @click="nextPage">&gt;&gt;</li>
                </ul>
            </div>
            <div class="post-body">
                <transition-group name="fade" tag="ul">
                    <li 
                        v-for="(post,index) of posts"
                        :key="index"
                    >
                        <router-link 
                            class="post-list-router-img"
                            :to="{name:'user_info',params:{name:post.loginName}}">
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
                        <router-link 
                            class="post-list-title"
                            :to="{name:'article'}"
                        >{{post.title}}
                        </router-link>
                        <span class="post-list-replyTime">
                            {{post.lastReplyTime+'前'}}
                        </span>
                    </li>
                </transition-group>
            </div>
        </div>
    </div>
</template>

<script>
import load from './mini-components/loading';
export default {
    data(){
        return{
            loading:true,
            postItems:[
                {keyZH:'全部',keyEN:'all'},
                {keyZH:'精华',keyEN:'good'},
                {keyZH:'分享',keyEN:'share'},
                {keyZH:'问答',keyEN:'ask'},
                {keyZH:'招聘',keyEN:'job'}
            ],
            // currPage:1,
            isActive:0,
            postLists:[],
            cachePosts:[],
            posts:[],
            currParams:{
                page:1
            },
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
    watch:{
        currPage(){
            this.getData();
        },
        postLists(newVal){
            if(this.posts.length > 0){
                this.posts.splice(0,20)
            }
            // console.log(this.posts);
            let filterPosts =newVal.map((post)=>{
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
            this.posts.push(...filterPosts);
        }
    },
    methods:{
        filterPosts(dataArr){
            return 
        },
        nextPage(){
            this.currParams.page+=1
        },
        prevPage(){
            if(this.currPage>1){
                this.currParams.page = this.currParams.page - 1;
            }
        },
        switchTab(index,keyName){
            let selfParams = this.currParams;
            this.postLists = [];
            this.cachePosts = [];
            if(keyName !== 'all'){
                selfParams.tab = keyName;
            }else{
                if(selfParams.hasOwnProperty('tab')){
                    delete selfParams.tab;
                }
            }
            //currpage和currParams.page 是同一个变量
            //currpage依赖currParams.page,作出回调函数响应
            if(this.currPage === 1){
                this.getData()
            }else{
                this.currParams.page = 1;
            };
            this.isActive = index;
            // this.getData();
            console.log(selfParams);
        },
        getData(){
            if(this.cachePosts.length === 0){
                let requestObj = {
                        url:' https://cnodejs.org/api/v1/topics',
                        method:'get',
                        params:{
                            limit:60
                        }
                    };
                Object.assign(requestObj.params,this.currParams);
                this.$http(requestObj).then((response)=>{
                    if(response.data.success === true ){
                        if(response.data.data.length < 20){
                            this.postLists = response.data.data;
                        }else{
                            this.cachePosts = response.data.data;
                            this.postLists = this.cachePosts.splice(0,20);
                        }
                        this.loading = false;
                        // console.log(response.data.data);
                    }
                }).catch((error)=>{
                    console.log(error)
                })
            }else{
                this.postLists = this.cachePosts.splice(0,20);
            }
        }
    },
    beforeMount(){
        this.getData();
    },
    computed:{
        currPage(){
            return this.currParams.page
        },
        pages(){
            let currPage = this.currPage;
            let pages = [];
            if(this.currPage <= 3){
                pages = [1,2,3,4,5];
            }else{
                pages = [currPage-2,currPage-1,currPage,currPage+1,currPage+2];
            }
            return pages;
        },
        // filterPosts:{
        //     set(newVal){

        //     },
        //     get(){
        //         return this.postLists.map((post)=>{
        //             return {
        //                 title:post.title,
        //                 imgUrl:post.author.avatar_url,
        //                 loginName:post.author.loginname,
        //                 replyCount:post.reply_count,
        //                 visitCount:post.visit_count,
        //                 tab:this.dealDataFn.getTab(post.tab),
        //                 lastReplyTime:this.$Fn.spaceTime(post.last_reply_at),
        //                 tabClass:['post-list-tab',post.tab]
        //             }
        //         })
        //     }
        // }
    },
    components:{
        load
    }
    // created(){
    //     let vm = this;
    //     let handle = function(event){
    //         //  变量scrollTop是滚动条滚动时，距离顶部的距离
    //    		var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
    //    		//变量windowHeight是可视区的高度
    //    		var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
    //    		//变量scrollHeight是滚动条的总高度
    //    		var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
    //                //滚动条到底部的条件
    //         if(scrollTop+windowHeight==scrollHeight && event.deltaY > 0){
    //                 //写后台加载数据的函数
    //             vm.nextPage();
    //             // console.log(vm.currPage);
    //             document.documentElement.scrollTop = 0;
    //                 window.removeEventListener('mousewheel',handle);
    //             setTimeout(function(){
    //                 window.addEventListener('mousewheel',handle);
    //             },1500) 
    //         }else if(scrollTop==0 && event.deltaY < 0){
    //             vm.prevPage();
    //                 window.removeEventListener('mousewheel',handle);
    //             setTimeout(function(){
    //                 window.addEventListener('mousewheel',handle);
    //             },1500)
    //         }
    //     };
    //     window.addEventListener('mousewheel',handle);
    // }
}
</script>

<style lang="scss" scoped>
    a{
        text-decoration: none;
    }
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
                    cursor: pointer;
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
        .post-footer{
            ul{
                border-radius: 5px;
                border: 1px solid #ccc;
                overflow: hidden;
                display: inline-block;
                li{
                    cursor: pointer;
                    color: #666;
                    text-align: center;
                    float:left;
                    width: 30px;
                    height: 25px;
                    line-height: 25px;
                    border-right: 1px solid #c6c6c6;
                }
                li:hover{
                    background: rgb(221, 221, 221)
                }
                .next{
                    border-right:none;
                }
                .pageActvie{
                    color: rgb(107, 227, 243);
                }
                .ellipsis{
                    cursor:auto;
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


