
<template lang='html'>
  <div id='container'>
    <div class='nav'>
      <div class='nav-list'>
        <router-link class="nav-item" to="/">首页</router-link>
        <router-link class='nav-item' to='/about'>关于</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>  
</template>


<style lang='stylus'>
  h2 {
    color: #f00;
    font-weight: normal;
  }
  #container {
    margin-top: 50px;
    color: #2c3e50;
    margin-left: 50px;
    margin-bottom: 50px;
  }
  a {
    color: #42b983;
  }
</style>