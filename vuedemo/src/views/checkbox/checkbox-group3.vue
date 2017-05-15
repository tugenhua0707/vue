<template>
  <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
    <tb-checkbox
      :indeterminate="indeterminate"
      :value="checkAll"
      @click.prevent.native="handleCheckAll">全选</tb-checkbox>
  <tb-checkbox-group v-model="checkAllGroup" @on-change="checkAllGroupChange">
    <tb-checkbox label="香蕉"></tb-checkbox>
    <tb-checkbox label="苹果"></tb-checkbox>
    <tb-checkbox label="西瓜"></tb-checkbox>
  </tb-checkbox-group>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        indeterminate: true,
        checkAll: false,
        checkAllGroup: ['香蕉', '西瓜']
      }
    },
    methods: {
      handleCheckAll () {
        if (this.indeterminate) {
          this.checkAll = false;
        } else {
          this.checkAll = !this.checkAll;
        }
        this.indeterminate = false;
          if (this.checkAll) {
            this.checkAllGroup = ['香蕉', '苹果', '西瓜'];
          } else {
            this.checkAllGroup = [];
          }
        },
        checkAllGroupChange (data) {
            if (data.length === 3) {
                this.indeterminate = false;
                this.checkAll = true;
            } else if (data.length > 0) {
                this.indeterminate = true;
                this.checkAll = false;
            } else {
                this.indeterminate = false;
                this.checkAll = false;
            }
        }
      }
   }
</script>