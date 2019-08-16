[TOC]

### 组件卸载后更新state引发警告

**触发** 

组件被切换并销毁，但是内部的残留的effect操作（setInterval、fetch等）触发了已销毁组件的更新状态方法（class组件的this.setState、hook中的useState(any)[2]）,会触发类似下方的警告。

```
Can’t perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.in Notification
```

<br>

**解决** 

这不算是hook特有的问题了，以往的class组件也会出现类似问题

暴力：

```js
const [state, setState] = useState([]);

useEffect(() => {
    async function fetchData() {
        let [err, res] = await getList(id);

        if (err) return;
       
        setState(res);
    }

    fetchData();

    // 直接在组件卸载后把setState设置为返回null的函数, 这样即使调用也不会触发状态更新了。
    return () => setState = () => null;
}, []);
```

<br>

官方：

```js
const [state, setState] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
    let ignore = false;	// (1) 设置flag

    async function fetchData() {
        setLoading(true);

        let [err, res] = await fetch(id);

        if (ignore || err) return;	// (3) 是否已卸载，没有的话设置状态
        setLoading(false);
        setDetail(res.data || []);
    }

    fetchData();
    
    return () => ignore = true;		// (1) 组件卸载时进行标记
}, []);
```

> 这种方式还有一个好处就是在频繁发送请求的场景中，并不能保证请求结果与请求发起的顺序一致，如果频繁触发可能会导致前一个请求的结果覆盖最新的请求结果。通过这种方式限制的话只有最新的一次请求可以被赋值。

<br>

任劳任怨:  

其实这不属于该问题的范畴，但是值得提醒一下，在使用timer或者其他插件时，请务必使用这种方式进行清理

```js
useEffect(() => {
    
    // (1) 触发effect操作
   	
    return () => {
        // (2) 清理：clearInterval、xxxFetch.abort()、xx.destory()等
    };
}, []);
```

<br>
<br>

### 为Effect回调添加名字
```js
useEffect(function mounted() {
  console.log(123);
}, []);

或者在前面加上注释，命名回调能在出错时获得精确的报错信息，而且在devtool中也能获得友好的提示
```
![](./2``[_1~}I4{`}L9GWQ[]8WI.png)


































