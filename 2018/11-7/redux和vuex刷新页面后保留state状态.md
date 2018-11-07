> 算是很常见的需求，实现方式也很简单。


# step1: 把state存到session
有两个钟方式，一种是在state改变的时候存，一种是在页面卸载事件里存。根据实际需求选择一种就行。
```js
window.addEventListener('beforeunload', function() {
  sessionStorage.setItem('APP_STORE_CACHE', JSON.stringify(store.state));
});

/* 各个库获全局取state的方式 */

// vuex store 实例下的state属性
store.state

// redux store  实例下的getState方法
store.getState()

// umi + dva 实例保存在全局变量window.g_app._store，用getstate获取即可。
window.g_app._store.getState()

```

每次state改变的时候存state的方式。
```js
// redux
store.subscribe(() => {
  // 通过实例获取state
})

// vuex
store.subscribe((mutation, state) => {
  // 直接取state参数
})

// umi + dva
// app.js

export const dva = {
  config: {
    onStateChange(state) {
      // 直接取state参数
    }
  }
};
```


<br>
<br>


# step2: 载入页面后取session里的state作为默认值
redux
```js

let sessionStore = sessionStorage.getItem('APP_STORE_CACHE');

const initialState = {
  visibilityFilter: false
  todos: []
};

function todoApp(state = JSON.parse(sessionStore) || initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        visibilityFilter: action.filter
      })
    default:
      return state
  }
}

```

<br>

vuex
```js
  let sessionStore = sessionStorage.getItem('APP_STORE_CACHE');

  if (sessionStore) {
    store.replaceState(JSON.parse(sessionStore));
  }
```

<br>

umi + dva
```js
let sessionStore = sessionStorage.getItem('APP_STORE_CACHE');

export const dva = {
  config: {
    initialState: sessionStore ? JSON.parse(sessionStore) : null,
  }
};
```