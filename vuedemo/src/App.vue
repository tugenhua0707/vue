
<template lang='html'>
  <div id='container'>
    <header-tab></header-tab>
    <h2>{{msg}}</h2>
    <div class='nav'>
      <div class='nav-list'>
        <router-link class="nav-item" to="/">首页</router-link>
        <router-link class='nav-item' to='/about'>关于</router-link>
      </div>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import HeaderTab from './components/header.vue';

export default {
  name: 'app',
  data() {
    return {
      msg: '欢迎学习vue.js'
    }
  },
  components: {
    'header-tab': HeaderTab
  }
}
</script>

<style lang='stylus'>
  h2 {
    color: #f00;
    font-weight: normal;
  }
  #container {
    margin-top: 50px;
    color: #2c3e50;
    text-align: center;
  }
  a {
    color: #42b983;
  }
</style>