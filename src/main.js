import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'
import Fn from './commonFunction/common'
Vue.prototype.$http = Axios;
Vue.prototype.$Fn = Fn;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
