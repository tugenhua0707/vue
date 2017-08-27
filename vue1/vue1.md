
Vue 改变数组中对象的属性不重新渲染View的解决方案
问题： 页面上多个item项， 当我鼠标移动上去的时候，我想在该数组中的对象添加一个属性 isHover=true, 当鼠标移出的时候，我想让该属性变为 isHover=false,
然后希望改变对象的属性的时候让其重新渲染view层，重新执行rowClasses方法，然后该方法会判断 isHover是否等于true，如果为true的话，让其增加一个类名。

代码如下：
<!DOCTYPE html>
<html>
  <head>
    <title>演示Vue</title>
    <style>
      * {margin: 0; padding: 0;}
      ul, li {list-style: none;}
      #app {width: 800px; margin: 20px auto; border:1px solid #ccc; border-bottom: none;}
      #app li {height: 32px; line-height: 32px; border-bottom: 1px solid #ccc;}
      #app li.bgColor {background-color: red;}
    </style>
  </head>
  <body>
    <div id='app'>
      <ul>
        <li 
          v-for="(item, index) in items" 
          @mouseenter.stop="handleMouseIn(index)"
          @mouseleave.stop="handleMouseOut(index)"
          :class="rowClasses(index)"
        >
          <span>{{item.name}}</span>
        </li>
      </ul>
    </div>
  </body>
  <script src="./vue.js"></script>
  <script type="text/javascript">
    new Vue({
      el: '#app',
      data: {
        items: [
          {name: 'kongzhi'},
          {name: 'longen'},
          {name: 'tugenhua'}
        ]
      },
      computed: {
        
      },
      methods: {
        rowClasses (index) {
          return [
            {
              [`bgColor`]: this.$data.items[index] && this.$data.items[index]._isHover
            }
          ]
        },
        handleMouseIn(index) {
          if (this.$data.items[index]._isHover) {
            return;
          }
          console.log(111); // 可以执行到
          this.$data.items[index]._isHover = true;
        },
        handleMouseOut(index) {
          this.$data.items[index]._isHover = false;
        }
      }
    });
  </script>
</html>

效果 vue1.html 

可以看到鼠标移动上去的时候 没有效果。

解决的方案如下：
1. 使用 Object.assign

鼠标移动上去的时候 代码可以改成如下
this.$data.items[index]._isHover = true;
this.$data.items = Object.assign({}, this.$data.items);

鼠标移出的时候，代码改成如下：
this.$data.items[index]._isHover = false;
this.$data.items = Object.assign({}, this.$data.items);

代码如下：
<!DOCTYPE html>
<html>
  <head>
    <title>演示Vue</title>
    <style>
      * {margin: 0; padding: 0;}
      ul, li {list-style: none;}
      #app {width: 800px; margin: 20px auto; border:1px solid #ccc; border-bottom: none;}
      #app li {height: 32px; line-height: 32px; border-bottom: 1px solid #ccc;}
      #app li.bgColor {background-color: red;}
    </style>
  </head>
  <body>
    <div id='app'>
      <ul>
        <li 
          v-for="(item, index) in items" 
          @mouseenter.stop="handleMouseIn(index)"
          @mouseleave.stop="handleMouseOut(index)"
          :class="rowClasses(index)"
        >
          <span>{{item.name}}</span>
        </li>
      </ul>
    </div>
  </body>
  <script src="./vue.js"></script>
  <script type="text/javascript">
    new Vue({
      el: '#app',
      data: {
        items: [
          {name: 'kongzhi'},
          {name: 'longen'},
          {name: 'tugenhua'}
        ]
      },
      computed: {
        
      },
      methods: {
        rowClasses (index) {
          return [
            {
              [`bgColor`]: this.$data.items[index] && this.$data.items[index]._isHover
            }
          ]
        },
        handleMouseIn(index) {
          if (this.$data.items[index]._isHover) {
            return;
          }
          console.log(111); // 可以执行到
          this.$data.items[index]._isHover = true;
          this.$data.items = Object.assign({}, this.$data.items);
        },
        handleMouseOut(index) {
          this.$data.items[index]._isHover = false;
          this.$data.items = Object.assign({}, this.$data.items);
        }
      }
    });
  </script>
</html>

效果 vue2.html

2. 使用Vue.set(object, key, value)方法将响应属性添加到嵌套的对象上。

鼠标移动上去的时候 代码可以改成如下
this.$set(this.$data.items[index], '_isHover', true);

鼠标移出的时候，代码改成如下：
this.$set(this.$data.items[index], '_isHover', false);

所有的代码如下：
<!DOCTYPE html>
<html>
  <head>
    <title>演示Vue</title>
    <style>
      * {margin: 0; padding: 0;}
      ul, li {list-style: none;}
      #app {width: 800px; margin: 20px auto; border:1px solid #ccc; border-bottom: none;}
      #app li {height: 32px; line-height: 32px; border-bottom: 1px solid #ccc;}
      #app li.bgColor {background-color: red;}
    </style>
  </head>
  <body>
    <div id='app'>
      <ul>
        <li 
          v-for="(item, index) in items" 
          @mouseenter.stop="handleMouseIn(index)"
          @mouseleave.stop="handleMouseOut(index)"
          :class="rowClasses(index)"
        >
          <span>{{item.name}}</span>
        </li>
      </ul>
    </div>
  </body>
  <script src="./vue.js"></script>
  <script type="text/javascript">
    new Vue({
      el: '#app',
      data: {
        items: [
          {name: 'kongzhi'},
          {name: 'longen'},
          {name: 'tugenhua'}
        ]
      },
      computed: {
        
      },
      methods: {
        rowClasses (index) {
          return [
            {
              [`bgColor`]: this.$data.items[index] && this.$data.items[index]._isHover
            }
          ]
        },
        handleMouseIn(index) {
          if (this.$data.items[index]._isHover) {
            return;
          }
          console.log(111); // 可以执行到
          this.$set(this.$data.items[index], '_isHover', true);
        },
        handleMouseOut(index) {
          this.$set(this.$data.items[index], '_isHover', false);
        }
      }
    });
  </script>
</html>

效果 vue3.html