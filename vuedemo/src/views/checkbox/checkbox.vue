
  <template>
    <div>
      <tb-checkbox v-model="single" @on-change='changeValue1'>Checkbox1</tb-checkbox>
    </div>
  </template>
<script>
  export default {
    name: 'checkboxPage',
    data() {
      return {
        single: false
      } 
    },
    methods: {
      changeValue1(value) {
        console.log(value);
      }
    }
  }
</script>