
function Observer(obj) {
  this.obj = obj;
  this.observerFunc(obj);
}

Observer.prototype = {
  observerFunc: function(obj) {
    var self = this;
    // 遍历对象的属性
    Object.keys(obj).forEach(function(key) {
      // 调用函数
      self.definedAttr(obj, key, obj[key]);
    });
  },
  definedAttr: function(obj, key, value){
    // 订阅器 可以通过dep添加订阅者，
    var dep = new Dep();

    // 递归调用函数 监听所有的子属性
    var childObj = observe(value);
    Object.defineProperty(obj, key, {
      emumerable: true,
      get: function() {
        // 是否添加订阅者，因此通过Dep定义一个全局的target属性，暂存watcher(订阅者)，添加完成后移除
        if (Dep.target) { 
          // 添加一个订阅者
          dep.addSub(Dep.target);
        }
        return value;
      },
      set: function(newVal) {
        if (newVal === value) {
          return;
        }
        value = newVal;
        // 发布消息
        dep.public();
      }
    });
  }
};

function observe(obj) {
  if (!obj || typeof obj !== 'object') {
    return;
  }
  return new Observer(obj);
};
function Dep() {
  this.subs = [];
}
Dep.prototype = {
  addSub: function(sub) {
    this.subs.push(sub);
  },
  removeSub: function(sub) {
    var index = this.subs.indexOf(sub);
    if (index*1 !== -1) {
      this.subs.splice(index, 1);
    }
  },
  public: function() {
    this.subs.forEach(function(sub){
      sub.update();
    });
  }
};
Dep.target = null;