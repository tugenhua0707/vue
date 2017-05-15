
<template>
  <div :class='classes'>
    <slot></slot>
  </div>
</template>

<script>
  import { findComponentsDownward } from '../../utils/utils';
  import Emitter from '../../mixins/emitter';
  const prefixCls = 'tb-checkbox-group';

  export default {
    name: 'tb-checkbox-group',
    mixins: [ Emitter ],
    props: {
      value: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    data () {
      return {
        currentValue: this.value,
        childrens: []
      }
    },
    computed: {
      classes() {
        return `${prefixCls}`;
      }
    },
    // 编译完成后执行一次 
    mounted () {
      this.updataModel(true);
    },
    methods: {
      updataModel (flag) {
        const value = this.value;
        this.childrens = findComponentsDownward(this, 'tb-checkbox');

        if(this.childrens) {
          this.childrens.forEach(child => {
            child.model = value;
            if (flag) {
              child.currentValue = value.indexOf(child.label) >= 0;
              child.group = true;
            }
          })
        }
      },
      change(data) {
        // console.log(data)
        this.currentValue = data;
        this.$emit('input', data);
        this.$emit('on-change', data);
        this.dispatch('FormItem', 'on-form-change', data);
      }
    },
    watch: {
      value() {
        this.updataModel(true);
      }
    }
  }
</script>