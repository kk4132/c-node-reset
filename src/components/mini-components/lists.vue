<template>
    <div class="lists">
        <h6>
            <slot name="title"></slot>
        </h6>
        <ul>
            <li 
                v-for="(data,index) of datas"
                :key="index"
            >
                <img :src="data.author.avatar_url" />
                <router-link 
                    :to="{name:'article',params:{id:data.id}}"
                >
                    {{data.title}}
                </router-link>
                <span>{{$Fn.spaceTime(data.last_reply_at)}}前</span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props:{
        datas:{
            required:true
        }
    },
    mounted(){
        console.log(this.datas)
    }
}
</script>

<style lang="scss" scoped>
    .lists{
        border: 1px solid #ddd;
        border-radius: 10px;
        padding: 20px;
        h6{

        }
        ul{
            li{
                margin:20px auto;
                img{
                    width: 50px;
                    border-radius: 10%;
                    float: left;
                }
                a{
                    padding-left: 20px;
                    height: 50px;
                    line-height: 50px;
                    color: rgb(62, 240, 142);
                }
                span{
                    float: right;
                }
            }
        }
    }
</style>


