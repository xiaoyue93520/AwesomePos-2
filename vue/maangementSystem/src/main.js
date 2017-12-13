// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.$http = axios

Vue.prototype.getLastTime = function(timeStr) {
    let times, replyTime
    let lastTime = new Date(timeStr).getTime()
    let nowTime = new Date().getTime()
    times = nowTime - lastTime
    switch (true) {
        case (times / 1000 < 1):
            replyTime = '刚刚'
            break
        case ((times / 1000 < 60) && (times / 1000 > 1)):
            replyTime = Math.floor(times / 1000) + '秒前'
            break
        case ((times / (1000 * 60) < 60) && (times / (1000 * 60) > 1)):
            replyTime = Math.floor(times / (1000 * 60)) + '分钟前'
            break
        case ((times / (1000 * 60 * 60) < 60) && (times / (1000 * 60 * 60) > 1)):
            replyTime = Math.floor(times / (1000 * 60 * 60)) + '小时前'
            break
        default:
            replyTime = Math.floor(times / (1000 * 60 * 60 * 24)) + '天前'
            break
    }
    return replyTime
}

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})
