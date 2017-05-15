
<template>
  <div>
    <tb-checkbox-group v-model='social' @on-change='changeValue1'>
      <tb-checkbox label='aa'>
        <span>AA</span>
      </tb-checkbox>
      <tb-checkbox label='bb'>
        <span>BB</span>
      </tb-checkbox>
      <tb-checkbox label='cc'>
        <span>CC</span>
      </tb-checkbox>
      <tb-checkbox label='dd'>
        <span>DD</span>
      </tb-checkbox>
    </tb-checkbox-group>
    <div>{{ social }}</div>

    <h3>下面是水果了！</h3>
    <tb-checkbox-group v-model='fruit' @on-change='changeValue2'>
      <tb-checkbox v-for="item in tags" :label="item.label" :key="item"></tb-checkbox>
    </tb-checkbox-group>
    <div>{{ fruit }}</div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        social: ['aa', 'cc'],
        fruit: ['西瓜'],
        tags: [
          {
            label: '香蕉'
          },
          {
            label: '苹果'
          },
          {
            label: '西瓜'
          }
        ]
      }
    },
    methods: {
      changeValue1 (data){
        console.log(data)
      },
      changeValue2(data) {
        console.log(data)
      }
    }
  }
</script>

