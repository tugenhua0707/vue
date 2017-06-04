
<template>
  <div v-clickoutside="handleClickOutSide">1111111</div>
</template>

<script>
  import clickoutside from '../../directive/clickoutside';
  export default {
    methods: {
      handleClickOutSide(e) {
        // 当外部被点击时调用
        console.log(e);
        console.log(111)
      }
    },
    directives: {
      clickoutside
    }
  }
</script>