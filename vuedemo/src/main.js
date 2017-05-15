
import Checkbox from './components/checkbox/checkbox.vue';
import CheckboxGroup from './components/checkbox/checkbox-group.vue';

const iview = {
  'tb-checkbox': Checkbox,
  'tb-checkbox-group': CheckboxGroup
};

const install = function (Vue, opts = {}) {
  Object.keys(iview).forEach((key) => {
    Vue.component(key, iview[key]);
  });
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
export default {
  version: '0.0.1',
  Checkbox,
  CheckboxGroup
};

module.exports = Object.assign(iview, {install});   // eslint-disable-line no-undef
