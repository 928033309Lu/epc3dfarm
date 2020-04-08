// 页面初始化 资源加载
import 'normalize.css/normalize.css'
import '@/assets/style/index.scss'
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from '@/store/index'
import App from './App.vue'

Vue.use(ElementUI)

// VUE部分 初始化
new Vue({
  router,
  store,
  render: h => h(App),
  created () {

  },
  mounted () {

  }
}).$mount('#app')

// 地图部分 初始化
import gwmap from '@/gwmap'
gwmap.init('mapContainer')
window.gwmap = gwmap

// window.$J = require('@goldwind/jsutils')
