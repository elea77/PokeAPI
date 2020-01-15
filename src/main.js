import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './router'
// import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(VueAxios)
Vue.use(axios)
Vue.prototype.$http = axios;
// Vue.use(Vuex)
// Vue.use(VueRouter)
Vue.use(VueRouter)
const router = new VueRouter({ routes, mode: 'history' })
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
