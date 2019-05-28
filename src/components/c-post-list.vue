<template>
    <div class="post">
        <div class="post-warp">
            <ul class="post-items">
                <li 
                    v-for="(item,index) of postItems"
                    :key="index"
                    :class="[itemActive === index?'item-active':'']"
                    @click="postItemClick(index,item.en)"
                >{{item.zh}}</li>
                <li class="line" 
                    :style="{left:`${linePosition}px`}">
                </li>
            </ul>
            <ul class="post-pages">
                <li class="page" @click="prevPage">&lt;&lt;</li>
                <li v-show="currPage > 3?true:false">......</li>
                <li 
                    v-for="(page,index) of postPages"
                    :key="index"
                    :class="['page',page === currPage?'pageActive':'']"
                    @click="currPage = page"
                >{{page}}
                </li>
                <li v-show="true">......</li>
                <li class="page" @click="++currPage">&gt;&gt;</li>
            </ul>
            <ul class="post-lists">
                <li 
                    v-for="(list,index) of postLists"
                    :key="index"
                >
                    <router-link 
                        :to="{name:'user_info',params:{loginname:list.userName}}"
                        class="img"
                    >
                        <img :src="list.imgUrl">
                    </router-link>
                    <span class="count">{{list.replyCount}} / {{list.visitCount}}</span>
                    <strong 
                        :class="list.tab != undefined?list.tab:'other'"
                    >
                        {{tabZh(list.tab)}}
                    </strong>
                    <router-link 
                        :to="{name:'article',params:{id:list.userName}}"
                        class="title"
                    >
                        {{list.title}}
                    </router-link>
                    <span class="date">{{$Fn.spaceTime(list.lastReplyAt)}}前</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            postItems:[
                        {zh:'全部',en:'all'},
                        {zh:'精华',en:'good'},
                        {zh:'分享',en:'share'},
                        {zh:'问答',en:'ask'},
                        {zh:'招聘',en:'job'}
                        ],
            itemActive:0,
            currPage:1,
            maxPage:5,
            postPages:[1,2,3,4,5],
            nextPage:[],
            postData:[],
            currParams:{
                page:0,
                limit:0,
                tab:'all'
            }
        }
    },
    watch:{
        currPage(newVal,oldVal){
            if(newVal > 2){
                this.postPages = [newVal-2,newVal-1,newVal];
                if(newVal > oldVal){
                    if(this.maxPage >= newVal+2){
                        this.postPages.push(newVal+1,newVal+2);
                    }else{
                        this.getPageTest(newVal+2,2).then(()=>{
                            if(this.nextPage.length > 0){
                                this.postPages = this.postPages.concat(this.nextPage);
                                this.nextPage = [];
                                this.maxPage = this.postPages[4];
                            }
                        })
                    }
                }else{
                   this.postPages.push(newVal+1,newVal+2); 
                }
                // 
            }else{
                this.postPages = [1,2,3,4,5];
            }
            this.currParams.page = newVal;
            this.getData()
        },
        currTab(){
            this.currPage = 1;
            this.getData()
        }
    },
    computed:{
        currTab(){
            return this.currParams.tab;
        },
        //下标线跟随选中项目移动距离
        linePosition(){
            return this.itemActive * 70;
        },
        postLists(){
            return this.postData.map((post)=>{
                return {
                    imgUrl:post.author.avatar_url,
                    userName:post.author.loginname,
                    userId:post.author_id,
                    createAt:post.create_at,
                    lastReplyAt:post.last_reply_at,
                    tab:post.tab,
                    title:post.title,
                    replyCount:post.reply_count,
                    visitCount:post.visit_count
                }
            })
        }
    },
    beforeMount(){
        let params = this.currParams;
            params.page = this.currPage;
            params.limit = 20;
        this.getData();
    },
    methods:{
        postItemClick(index,tab){
            this.itemActive = index;
            this.currParams.tab = tab;
        },
        prevPage(){
            if(this.currPage > 1){
               --this.currPage;
            }
        },
        getData(){
            let params = Object.assign({},this.currParams);
            if(params.tab === 'all')delete params.tab;
            this.$http({
                url:'https://cnodejs.org/api/v1/topics',
                method:'get',
                params:params
            }).then((res)=>{
                if(res.data.success === true){
                    this.postData = res.data.data;
                }
            }).catch((error)=>{
                console.log(error);
            })
        },
        //测试该页面是否存在
        getPageTest(page,count){
           if(count < 1)return;
           return this.$http({
                url:'https://cnodejs.org/api/v1/topics',
                method:'get',
                params:{
                    page,
                    limit:20
                }
            }).then((res)=>{
                if(res.data.success === true &&
                    res.data.data.length > 0
                ){
                    if(count === 2){
                       this.nextPage.push(page-1,page);
                    }else{
                       this.nextPage.push(page);
                    }
                }else{
                    return this.getPageTest(page-1,--count);
                }
            }).catch((error)=>{
                console.log(error);
            }) 
        },
        //取得tab中文名
        tabZh(tab){
            try{
                let result = this.postItems.filter((item)=>{
                if(item.en === tab) return true;
                });
                if(result.length > 0){
                    return result[0].zh;
                }else{
                    return '其他'
                }
            }catch(err){
                console.log(err);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    li{
        list-style: none;
    }
    a{
        text-decoration: none;
    }
    .post{
        font-size:14px;
        width: 900px;
        border: 1px solid #eee;
        margin: 10px auto;
        .post-warp{
            width: 840px;
            margin: 20px auto;
            .post-items{
                border-bottom:1px solid #ccc;
                position: relative;
                li:not(.line){
                    display: inline-block;
                    margin-right: 40px;
                    cursor: pointer;
                    border-bottom:1px solid #fff;
                    width: 30px;
                    margin-bottom: 10px;
                }
                li:not(.line):hover{
                    color: rgb(2, 219, 219);
                }
                .item-active{
                    color: rgb(2, 219, 219);
                }
                .line{
                    width: 30px;
                    border-top: 1px solid  rgb(143, 255, 255);
                    position: absolute;
                    transition: all .5s;
                }
            }
            .post-pages{
                margin-top: 5px;
                li{
                    text-align: center;
                    display: inline-block;
                    width: 30px;
                    height: 20px;
                    border: 1px solid #fff;
                }
                li:hover{
                    border: 1px solid #e1e1e1;
                }
                .page{
                    cursor: pointer;
                }
                .pageActive{
                    color: aqua;
                }
            }
            .post-lists{
                margin-top:20px;
                li{
                    height:50px;
                    line-height: 50px;
                    overflow: hidden;
                    margin-bottom: 10px;
                    .img{
                        float: left;
                        img{
                            width: 50px;
                            height: 50px;
                            border-radius: 50%;
                        }
                    }
                    .count{
                        float: left;
                        width: 100px;
                        margin-left: 20px;
                        text-align: center;
                    }
                    strong{
                        float: left;
                        text-align: center;
                        border-radius: 10%;
                        box-sizing: border-box;
                        width: 50px;
                        height: 30px;
                        line-height: 30px;
                        margin-top: 10px;
                    }
                    .ask{
                        background-color:rgb(240, 255, 204);
                        color:rgb(126, 180, 0);
                        border: 1px solid rgb(126, 180, 0);
                    }
                    .share{
                        background-color:rgb(195, 250, 197);
                        color:rgb(0, 175, 6);
                        border: 1px solid rgb(0, 175, 6);
                    }
                    .job{
                       background-color:rgb(97, 159, 253) 
                    }
                    .good{
                        background-color:rgb(247, 135, 241)
                    }
                    .other{
                        background-color:rgb(247, 195, 135)
                    }
                    .title{
                        display: inline-block;
                        color: rgb(0, 149, 194);
                        margin-left:30px;
                        // border: 1px solid red;
                        width: 400px;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                        font-size: 17px;
                    }
                    .date{
                        float: right;
                    }
                }
            }
        }
    }
</style>


