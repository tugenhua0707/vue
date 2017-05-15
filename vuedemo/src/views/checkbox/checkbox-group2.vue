<template>
  <div>
    <tb-checkbox v-model="disabledSingle" disabled>Checkbox</tb-checkbox>
    <tb-checkbox-group v-model="disabledGroup">
      <tb-checkbox label="香蕉" disabled></tb-checkbox>
      <tb-checkbox label="苹果" disabled></tb-checkbox>
      <tb-checkbox label="西瓜"></tb-checkbox>
    </tb-checkbox-group>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        disabledSingle: true,
        disabledGroup: ['苹果']
      }
    }
  }
</script>