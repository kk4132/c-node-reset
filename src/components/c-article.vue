<template>
    <div class="article">
       <left class="left"></left>
       <div v-text="data.content"></div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            data:{},
            loading:false
        }
    },
    computed:{
        // content(){
        //     let contents = this.data.content
        //     return 
        // }
    },
    methods:{
        getData(){
            let url = 'https://cnodejs.org/api/v1/topic/'+this.$route.params.id;
            this.$http({
                url,
                method:'get',
                params:{

                }
            }).then((res)=>{
                if(res.data.success === true){
                    this.data = res.data.data;
                    console.log(this.data.content)
                    this.loading = true;
                    setTimeout(()=>{
                        this.loading = true;
                    },1000)
                }
            }).catch((err)=>{
                // console.log(err)
            })
        },

    },
    mounted(){
        this.getData()
    },
    components:{
        left:{
            render(h){
                if(this.$parent.data.content){
                let content = this.$parent.data.content;
                let domReg = /<([^>]+)>([^<]+)<\/[^>]>/igm,
                     dom1 = domReg.exec(content),
                     dom2 = domReg.exec(content);
                     console.log(dom1,dom2);
                }
                let dom =['h1','test'];
                return h(...dom);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .article{
        font-size: 14px;
        width: 1200px;
        margin: 10px auto;
        .left{
            width: 980px;
            float: left;
            
        }
    }
    .markdown-text{
                color: yellow;
                h2{
                    color: yellow;
                    border-bottom:1px solid #ddd;
                }
    }
</style>


