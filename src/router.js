import Vue from 'vue';
import Router from 'vue-router';
import positList from './components/c-post-list';
import userInfo from './components/c-user-info';
import article from './components/c-article'
Vue.use(Router);
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path:'/',
      name:'root',
      components:{
        main:positList
      }
    },
    {
      path:'/user_info/:loginname',
      name:'user_info',
      components:{
        main:userInfo
      }
    },
    {
      path:'/article/:id',
      name:'article',
      components:{
        main:article
      }
    }
  ]
})
