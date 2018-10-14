# 一级标题

## 二级标题

### 三级标题

#### 四级标题

##### 五级标题

###### 六级标题

# 有序列表

1. 文字文字文字文字文字文字文字
2. 文字文字文字文字文字文字文字
3. 文字文字文字文字文字文字文字
4. 文字文字文字文字文字文字文字


# 无序列表

- 文字文字文字文字文字文字文字
- 文字文字文字文字文字文字文字
  - 二级
  - 三级
    - 四级
- 文字文字文字文字文字文字文字
- 文字文字文字文字文字文字文字


# 分割线
----


# 引用
> 引用
  >> 引用2
    >>> 引用3


# 斜体和加粗
<br />
<br />
<br />
<br />
这是*斜体*, **加粗**, _斜体_, __加粗__，


# 连接和图片
[专栏](https://zhuanlan.zhihu.com/lixianjie "深蓝的博客")
<https://zhuanlan.zhihu.com/lixianjie>

![tupian](https://github.com/qq1073830130/blog/blob/master/2018-10-14/img/7.jpg "示例图片")

# 代码
内联代码
`alert('msg')`

块级代码
``` js
// js示例
const loggerMiddleware = store => next => action => {
  console.log('prev', store.getState())
  let result = next(action)
  console.log('next', store.getState())
  return result
}
```

----

``` css
// css示例
.iconfont {
  display: inline-block;
  font-family: 'iconfont' !important;
  font-style: normal;
  font-size: inherit;
  text-rendering: auto;
}

/* 动画 */
.animate-spin {
  transform-origin: center center;
  animation: fa-spin 2s infinite linear;
}

.animate-pulse {
  animation: fa-spin 1s infinite steps(8);
}
```

----

``` html
<!-- html示例 -->
<!DOCTYPE html>
<html lang="zh-CN">

<head>
  <%= require('../template/meta_link.tpl') %>
  <title>
    <%= htmlWebpackPlugin.options.title %>
  </title>
</head>

<body>
  <div id="react_test"></div>
</body>

</html>
```

# 表格
| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

项目     | 价格
-------- | ---
Computer | $1600
Phone    | $12
Pipe     | $1

# 其他
缩进
半方大的空白&ensp;或&#8194;看，飞碟
全方大的空白&emsp;或&#8195;看，飞碟
不断行的空白格&nbsp;或&#160;看，飞碟
&emsp;&emsp;段落从此开始。

# 字体、字号、颜色
<font face="黑体">我是黑体字</font>
<font face="微软雅黑">我是微软雅黑</font>
<font face="STCAIYUN">我是华文彩云</font>
<font color=#0099ff size=12 face="黑体">黑体</font>
<font color=#00ffff size=3>null</font>
<font color=gray size=5>gray</font>

快捷键 `Ctrl + D` 来收藏本页
