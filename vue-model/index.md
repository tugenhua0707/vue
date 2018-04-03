
vue 如何在循环中绑定v-model

我现在有这么一个需求，页面上有多项输入框，但是具体有多少项，我也不知道，它是通过"新增一项"按钮点击事件，点击一下，就新增一项；如下图这个样子；
图1

代码如下：
<ul class="list">
  <li>
    <label>第1项</label>
    <input type="text" v-model="item1" />
  </li>
  <li>
    <label>第2项</label>
    <input type="text" v-model="item2" />
  </li>
</ul>
<button @click="newadd">新增一项</button>

我希望的是，如上代码 v-model="item1", item2, 依次类推 ... item(n);

当我们点击提交按钮的时候，我们需要判断input输入框是否有值，没有值的话，不允许提交等等这些操作。这些东西我们可以通过 v-model来判断；
所以我当初的设计是想，想通过这样循环来给v-model设置不同的值：
<li v-for="(item, index) in items">
  <label>第{{index+1}}项</label>
  <input type="text" v-model="'item'+(index+1)" />
</li>
但是这样弄，vue就会报错了，或者v-model不生效等等这些问题的产生，它会直接把 item2等显示在input输入框内，所以这种方法目前还未想到解决的方法
，但是我们可以换一种方式去考虑的。

最终方案是：
1. 首先在data里面定义如下字段：
data: {
  count: 1,
  arrs: [{'value': 1, 'customItem': ''}]
},
count: 1, 含义是某一项是从1开始的。
arrs: [{'value': 1, 'customItem': ''}]， 含义是template内会循环这个数组 arrs, 页面中默认有一项。

2. 然后每次新增的时候，会调用newadd方法：
newadd() {
  this.count++;
  this.arrs.push({'customItem': '', 'value': this.count});
},
其中 customItem 可以理解为 v-model的每一项值，因此在我们提交的时候，我们只需要循环数组 this.arrs来判断第几行输入框input没有值，就提示
下用户哪项没有值了。

因此所有的代码如下：
<!DOCTYPE html>
<html>
  <head>
    <title>演示Vue</title>
    <style>
      ul,li {list-style: none;}
      .list {float: left; width:200px;}
      button {float:left; margin-top:18px;}
    </style>
  </head>
  <body>
    <div id="app">
      <div style="width:100%;overflow:hidden;">
        <ul class="list">
          <li v-for="(item, index) in arrs">
            <label>第{{index+1}}项</label>
            <input type="text" v-model="item.customItem" />
          </li>
        </ul>
        <button @click="newadd">新增一项</button>
      </div>
      <div style="width:100%;margin-left:40px;overflow:hidden;">
        <button @click="comfirm">提交</button>
      </div>
    </div>
  </body>
  <script src="./vue.js"></script>
  <script>
    var app = new Vue({
      el: '#app',
      data: {
        count: 1,
        arrs: [{'value': 1, 'customItem': ''}]
      },
      methods: {
        newadd() {
          this.count++;
          this.arrs.push({'customItem': '', 'value': this.count});
        },
        comfirm() {
          for (let i = 0; i < this.arrs.length; i++) {
            var item = this.arrs[i];
            if (!item.customItem) {
              alert('第'+(i+1)+'项不能为空');
              return;
            }
          }
        }
      }
    })
  </script>
</html>