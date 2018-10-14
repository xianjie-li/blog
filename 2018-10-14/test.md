以下语法都是github标准的markdown语法
#目录
一到六级的标题会自动被提取为目录（github不支持）
[TOC]


<br /><br />

# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题

<br /><br />

# 分割线
----

<br /><br />

# 列表
#### 有序列表
1. 有序列表
2. 有序列表
    1. 二级
    2. 二级
        1. 三级
3. 有序列表

#### 无序列表
* 有序列表
* 有序列表
    * 二级
    * 二级
        * 三级
* 有序列表

<br /><br />

# 文字强调
*斜体* **加粗**   &nbsp;&nbsp;&nbsp;&nbsp;推荐的方式，不易混淆
_斜体_ __斜体__
~~删除线~~

<br>

# 链接
快速链接
<https://zhuanlan.zhihu.com/> 
标准
[链接名](https://zhuanlan.zhihu.com/lixianjie "深蓝") 
图片
![图片名](https://github.com/qq1073830130/blog/blob/master/2018-10-14/img/7.jpg?raw=true "描述")

# 代码
#### 内联代码
这是一段内联代码 `console.log(msg)`

#### 块级代码
```js
forEach(v => {
    console.log(v)
})
```
```css
.block_element--mod {
    padding: 8px 12px;
}
```
```html
<div class="block--mod">
    <span class="block_element"></span>
<div>
```

# 表格
表头用来-分割出来, 可以内联其他语法
|First Header|Second Header|
|-----|-----|
| Content Cell  | ~~Content Cell~~  |
| **Content Cell**  | *Content Cell*  |

对其方式
|First Header|Second Header|Second Header|
|-----:|:-----|:-----"|
| Content Cell  | ~~Content Cell~~  | ~~Content Cell~~  |
| **Content Cell**  | *Content Cell*  | *Content Cell*  |

<br>
<br>

# 引用 
> 引用
  >> 引用2

<br>
<br>

# 空格
空&nbsp;格


