> 由于路由动画可有可无，一直也没有深入研究过，今天突然遇到要实现类似原生App的前进后退分别对应左右划进划出的效果，开始觉得很eazy，结果一番坑踩下来真的一言难尽...



## 坑

1.  首先是顺着记忆在vue-router官网找到这个例子：

```js
<!-- 使用动态的 transition name -->
<transition :name="transitionName">
  <router-view></router-view>
</transition>

// 接着在父组件内
// watch $route 决定使用哪种过渡
watch: {
  '$route' (to, from) {
    const toDepth = to.path.split('/').length
    const fromDepth = from.path.split('/').length
    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
  }
}
```

大概看了一下，发现这种写法只适用于嵌套路由，而一般我们在项目中同级路由跳转的情况是很多的，所以这种方法基本上相当于没有。

2. 然后尝试使用popstate判断back，完全不可行。
3. 通过monkey function修改vue-router的原型事件来监听前进后退，在<router-link>调用时直接报错，具体原因没细查, 先pass掉。

```js
const router = new VueRouter(...);
let _back = router.back;
let _push = router.push;

router.back = (...args) => {
    console.log('后退鸟!');
    _back(...args);
}

router.push = (...args) => {
    console.log('前进鸟!');
    _push(...args);
}
```

4.使用一个数组变量来存放访问过的路径，再路由变化时适当判断对路由进行推入推出。

```js
// PageTranstion.vue
<template>
  <transition :name="transitionName">
    <slot></slot>
  </transition>
</template>

<script>
  let routerList = [];
  export default {
    name: 'PageTranstion',
    data() {
      return {
        transitionName: ''
      }
    },
    watch: {
      '$route': {
        handler(to, from) {

          routerList.push(from.path);
          let existPath = routerList.indexOf(to.path)

          if(existPath != -1) {
            routerList.splice(existPath, 1)

            // 如果是返回了，则去掉前一个路由
            let formPath = routerList.indexOf(from.path);
            routerList.splice(formPath, 1)
            this.transitionName = 'slide-l-r';
          } else {
            this.transitionName = 'slide-r-l';
          }

        }
      }
    },
  };
</script>

<style>
  .slide-l-r-enter-active,
  .slide-l-r-leave-active {
    transition: 0.5s;
  }
  .slide-l-r-enter {
    transform: translate3d(-100%, 0, 0);
  }
  .slide-l-r-leave-to {
    transform: translate3d(100%, 0, 0);
  }

  .slide-r-l-enter-active,
  .slide-r-l-leave-active {
    transition: 0.5s;
  }
  .slide-r-l-enter {
    transform: translate3d(100%, 0, 0);
  }
  .slide-r-l-leave-to {
    transform: translate3d(-100%, 0, 0);
  }
</style>


// 使用
<PageTranstion>
    <router-view></router-view>
</PageTranstion>
```



## 总结

主要思路就是需要在路由切换时能够判断是前进还是后退，但是就目前来说并没有一个理想的方法，只能自己维护一个变量来手动判断前进后退。

方法4能实现前进后退效果，但是还是有一点瑕疵，在一直push页面时，如果push了一个已经打开过的页面会判断为返回，这样好像合理好像又不合理。但是换个角度来看，项目开发的时候一直往历史栈里push直到重复页面出现的情况应该很少才对。





