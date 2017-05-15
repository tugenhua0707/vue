
<template>
  <label :class='wrapClasses'>
    <span :class='checkboxClasses'>
      <span :class='innerClasses'></span>
      <input 
        v-if='group'
        type='checkbox'
        :class='inputClasses'
        :disabled='disabled'
        :value='label'
        v-model='model'
        @change='change'
      >
      <input
        v-if='!group'
        type='checkbox'
        :class='inputClasses'
        :disabled='disabled'
        :checked='currentValue'
        @change='change'
      >
    </span>
    <slot><span v-if='showSlot'>{{ label }}</span></slot>
  </label>
</template>

<script>
  import { findComponentUpward } from '../../utils/utils';
  import Emitter from '../../mixins/emitter';
  const prefixCls = 'tb-checkbox';

  export default {
    name: 'tb-checkbox',
    mixins: [ Emitter ],
    props: {
      disabled: {
        type: Boolean,
        default: false
      },
      value: {
        type: Boolean,
        default: false
      },
      label: {
        type: [String, Number, Boolean]
      },
      indeterminate: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        model: [],
        currentValue: this.value,
        group: false,
        showSlot: true,
        parent: findComponentUpward(this, 'tb-checkbox-group')
      };
    },
    computed: {
      wrapClasses() {
        return [
          `${prefixCls}-wrapper`,
          {
            [`${prefixCls}-checked`]: this.currentValue,
            [`${prefixCls}-disabled`]: this.disabled,
            [`${prefixCls}-indeterminate`]: this.indeterminate
          }
        ];
      },
      checkboxClasses () {
        return [
          `${prefixCls}`,
          {
            [`${prefixCls}-checked`]: this.currentValue,
            [`${prefixCls}-disabled`]: this.disabled,
            [`${prefixCls}-indeterminate`]: this.indeterminate
          }
        ];
      },
      innerClasses() {
        return `${prefixCls}-inner`;
      },
      inputClasses() {
        return `${prefixCls}-input`;
      }
    },
    // 编译完成后执行的钩子函数
    mounted () {
      this.parent = findComponentUpward(this, 'tb-checkbox-group');
      if (this.parent) {
        this.group = true;
      }
      if(!this.group) {
        this.updateModel();
      } else {
        this.parent.updataModel(true);
      }
    },
    methods: {
      change (event) {
        if(this.disabled) {
          return false;
        }
        const checked = event.target.checked;
        this.currentValue = checked;

        // 改变 v-model 的值 及 input 输入框的值
        this.$emit('input', checked);

        if(this.group) {
          this.$parent.change(this.model);
        } else {
          this.$emit('on-change', checked);

          // 触发form 表单中的事件
          this.dispatch('FormItem', 'on-form-change', checked);
        }
      },
      updateModel () {
        this.currentValue = this.value;
      }
    },
    watch: {
      value () {
        this.updateModel();
      }
    }
  }
</script>