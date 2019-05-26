<template>
    <div class="post">
        <div class="post-warp">
            <ul class="post-items">
                <li 
                    v-for="(item,index) of postItems"
                    :key="index"
                    :class="[itemActive === index?'item-active':'']"
                    @click="itemActive = index"
                >{{item.zh}}</li>
                <li class="line" 
                    :style="{left:`${linePosition}px`}">
                </li>
            </ul>
            <ul class="post-pages">
                <li class="page">&lt;&lt;</li>
                <li v-show="true">......</li>
                <li 
                    v-for="(page,index) of postPages"
                    :key="index"
                    :class="['page',pageActive === index?'pageActive':'']"
                >{{page}}
                </li>
                <li v-show="true">......</li>
                <li class="page">&gt;&gt;</li>
            </ul>
            <ul class="post-lists">
                <li 
                    v-for="(list,index) of postLists"
                    :key="index"
                >
                    <router-link 
                        :to="{name:'user_info'}"
                        class="img"
                    >
                        <img :src="list.imgUrl">
                    </router-link>
                    <span class="count">{{list.replyCount}} / {{list.visitCount}}</span>
                    <strong 
                        :class="list.tab"
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
            pageActive:0,
            postPages:[1,2,3,4,5],
            postData:[]
        }
    },
    computed:{
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
        this.getData();
    },
    methods:{
        getData(){
            this.$http({
                url:'https://cnodejs.org/api/v1/topics',
                method:'get',
                params:{
                    page:1,
                    limit:20
                }
            }).then((res)=>{
                if(res.data.success === true){
                    this.postData = res.data.data;
                    console.log(this.postData);
                }
            }).catch((error)=>{
                console.log(error);
            })
        },
        //取得tab中文名
        tabZh(tab){
            return this.postItems.filter((item)=>{
                if(item.en === tab) return true;
            })[0].zh;
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
        height: 500px;
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
                        width: 50px;
                        height: 30px;
                        line-height: 30px;
                        margin-top: 10px;
                    }
                    .ask{
                        background-color:rgb(202, 230, 137)
                    }
                    .share{
                        background-color:rgb(135, 247, 141)
                    }
                    .job{
                       background-color:rgb(97, 159, 253) 
                    }
                    .good{
                        background-color:rgb(247, 135, 241)
                    }
                    .title{
                        display: inline-block;
                        color: rgb(0, 194, 87);
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


