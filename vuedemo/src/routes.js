
import Vue from 'vue';
import Router from 'vue-router';
import indexPage from './components/header.vue';
import homePage from './views/home.vue';
import aboutPage from './views/about.vue';
import checkbox from './views/checkbox/checkbox.vue';
import checkboxGroup from './views/checkbox/checkbox-group.vue';
import checkboxGroup2 from './views/checkbox/checkbox-group2.vue';
import checkboxGroup3 from './views/checkbox/checkbox-group3.vue';
import clickoutside from './views/directive/clickoutside.vue';
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: homePage
    },
    {
      path: '/about',
      component: aboutPage
    },
    {
      path: '/checkbox',
      component: checkbox
    },
    {
      path: '/checkboxGroup',
      component: checkboxGroup
    },
    {
      path: '/checkboxGroup2',
      component: checkboxGroup2
    },
    {
      path: '/checkboxGroup3',
      component: checkboxGroup3
    },
    {
      path: '/clickoutside',
      component: clickoutside
    }
  ]
})