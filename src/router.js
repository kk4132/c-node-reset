import Vue from 'vue';
import Router from 'vue-router';
import positList from './components/c-post-list';
import userInfo from './components/c-user-info';
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
      path:'/user_info',
      name:'user_info',
      component:{
        main:userInfo
      }
    }
  ]
})
