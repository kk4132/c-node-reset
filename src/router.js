import Vue from 'vue' 
import Router from 'vue-router'
import positList from './components/c-post-list'
Vue.use(Router)

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
    }
  ]
})
