import Vue from 'vue';
import App from './App.vue'
import router from './routes.js'

// 导入所有的样式
import './assets/styles/index.css';


// 开启错误提示
Vue.config.debug = true;

new Vue({
  router,
  el: '#container',
  render: h => h(App)
});