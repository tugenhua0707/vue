
<template lang='html'>
  <div>
    <ol>
      <li v-for='item in items'>
        {{ item.text }}
      </li>
    </ol>
    <button @click='eClick()'>事件</button>
  </div>
</template>

<script>
  export default {
    name: 'homeP',
    data() {
      return {
        items: [
          { text: 'Learn Vue.js' },
          { text: 'hello world' },
          { text: 'haha' }
        ]
      }
    },
    methods: {
      eClick() {
        console.log(111222333)
      }
    }
  }
</script>