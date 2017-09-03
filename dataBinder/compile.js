
function Compile(el, vm) {
  this.$vm = vm;
  this.$el = this.isElementNode(el) ? el : document.querySelector(el);

  if (this.$el) {
    this.$fragment = this.node2Fragment(this.$el);
    this.init();
    this.$el.appendChild(this.$fragment);
  }
}

Compile.prototype = {
  // 将节点内容全部拷贝到 fragment 中
  node2Fragment: function(el) {
    var fragment = document.createDocumentFragment();
    var child;
    // 将原生节点拷贝到fragment中
    while (child = el.firstChild) {
      fragment.appendChild(child);
    }
    return fragment;
  },
  init: function() {
    this.compileElement(this.$fragment);
  },
  compileElement: function(el) {
    var childNodes = el.childNodes,
      self = this;

    [].slice.call(childNodes).forEach(function(node) {
      // textContent 属性设置或返回指定节点的文本内容，以及它的所有后代
      var text = node.textContent;
      var reg = /\{\{(.*)\}\}/;   // 获取 {{ msg }}  获取msg这样的
  
      // 如果节点是元素节点的话，按元素节点方式编译
      if (self.isElementNode(node)) {
        self.compile(node);

      } else if (self.isTextNode(node) && reg.test(text)) {
        // 如果是文本节点的话 且是 {{xx}} 这种形式
        self.compileText(node, RegExp.$1);
      }

      // 如果还有子节点的话 递归调用子节点 进行编译
      if (node.childNodes && node.childNodes.length) {
        self.compileElement(node);
      }
    });
  },
  compile: function(node) {
    var nodeAttrs = node.attributes;
    var self = this;
    [].slice.call(nodeAttrs).forEach(function(attr) {
      // 指令规定按 v-xxx 命名 比如<div v-text="content"></div> 这样的 v-text
      var attrName = attr.name;  // v-text
      if (self.isDirective(attrName)) {
        var attrValue = attr.value;  // content
        // 从 v- 开始
        var dir = attrName.substring(2); // text
        // 判断是否是事件指令
        if (self.isEventDirective(dir)) {
          // 事件指令 比如 v-on:click 这样的
          compileUtil.eventHandler(node, self.$vm, attrValue, dir);
        } else {
          // 普通指令
          compileUtil[dir] && compileUtil[dir](node, self.$vm, attrValue);
        }
        node.removeAttribute(attrName);
      }
    });
  },
  compileText: function(node, attrValue) {
    compileUtil.text(node, this.$vm, attrValue);
  },
  isDirective: function(attrName) {
    return attrName.indexOf('v-') === 0;
  },
  isEventDirective: function(dir) {
    return dir.indexOf('on') === 0;
  },
  isElementNode: function(node) {
    return node.nodeType === 1;
  },
  isTextNode: function(node) {
    return node.nodeType === 3;
  }
};
// 指令集合
var compileUtil = {
  text: function(node, vm, attrValue) {
    this.bind(node, vm, attrValue, 'text');
  },
  html: function(node, vm, attrValue) {
    this.bind(node, vm, attrValue, 'html');
  },
  model: function(node, vm, attrValue) {
    this.bind(node, vm, attrValue, 'model');
    var self = this;
    var val = this._getVMVal(vm, attrValue);
    node.addEventListener('input', function(e) {
      var newValue = e.target.value;
      if (val === newValue) {
        return;
      }
      self._setVMVal(vm, attrValue, newValue);
      val = newValue;
    });
  },
  class: function(node, vm, attrValue) {
    this.bind(node, vm, attrValue, 'class');
  },
  bind: function(node, vm, attrValue, dir) {
    var updaterFn = updater[dir + 'Updater'];
    updaterFn && updaterFn(node, this._getVMVal(vm, attrValue));
    new Watcher(vm, attrValue, function(value, oldValue) {
      updaterFn && updaterFn(node, value, oldValue);
    });
  },
  // 事件处理
  eventHandler: function(node, vm, attrValue, dir) {
    var eventType = dir.split(':')[1],
      fn = vm.$options.methods && vm.$options.methods[attrValue];
      if (eventType && fn) {
        node.addEventListener(eventType, fn.bind(vm), false);
      }
  },
  _getVMVal: function(vm, attrValue) {
    var val = vm;
    attrValue = attrValue.split('.');
    attrValue.forEach(function(k) {
      val = val[k];
    });
    return val;
  },
  _setVMVal: function(vm, attrValue, value) {
    var val = vm;
    attrValue = attrValue.split('.');
    attrValue.forEach(function(k, i){
      // 不是最后一个key， 更新val的值
      if (i < attrValue.length - 1) {
        val = val[k];
      } else {
        val[k] = value;
      }
    });
  }
};

var updater = {
  textUpdater: function(node, value) {
    node.textContent = typeof value === 'undefined' ? '' : value;
  },
  htmlUpdater: function(node, value) {
    node.innerHTML = typeof value === 'undefined' ? '' : value;
  },
  classUpdater: function(node, value, oldValue) {
    var className = node.className;
    className = className.replace(oldValue, '').replace(/\s$/, '');
    var space = className && String(value) ? ' ' : '';
    node.className = className + space + value;
  },
  modelUpdater: function(node, value, oldValue) {
    node.value = typeof value === 'undefined' ? '' : value;
  }
};
