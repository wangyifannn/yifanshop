// 
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyload from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'

import apiConfig from '../config/api.config'
import Axios from 'axios'
import VueAxios from 'vue-axios'
Axios.defaults.baseURL = 'api'

Vue.use(VueAxios, Axios)
Vue.use(infiniteScroll)
Vue.use(VueLazyload, {
    // preLoad: 1.3,
    error: '../static/loading/loading-balls.svg',
    loading: "../static/loading/loading-spinning-bubbles.svg"
        // attempt: 1
})

import '../static/css/index.css'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})