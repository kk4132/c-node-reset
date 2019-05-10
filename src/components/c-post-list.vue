<template>
    <div class="posts">
        <div class="post-header">
            <ul>
                <li v-for="(item,index) of postItems"
                    :key="index"
                    :class="index == 0?'li_active':''"
                >
                    {{item}}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            postItems:['全部','精华','分享','问答','招聘']
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
    }
    li{
        list-style: none;
    }
    .li_active{
       color:rgb(15, 106, 241);
       border-bottom:1px solid rgb(15, 106, 241);  
    }
</style>


