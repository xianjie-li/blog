# 解决react hooks在devtool中不能显示详细信息的问题

## 问题
使用hooks api进行开发时，发现正在使用的devtool工具(3.6版本)不能正常使用，如果state不是原始结构，就会显示为形如 `{...}` 这样的格式。

<br />

## 解决
安装4.0体验版本 <https://react-devtools-experimental.now.sh/>

具体可见相关的issue <https://github.com/facebook/react-devtools/issues/1282/>

<br />

## 安装步骤
1. 进入 <https://react-devtools-experimental.now.sh /> 点击1.download extension
2. chrome 打开 `chrome://extensions/`，注意这里直接安装是不能使用的，因为该扩展没有再应用商店上架，将下载好的扩展文件后缀改为zip然后解压到一个空文件夹中。然后点开扩展页右上角的开发者模式，点击加载已解压的扩展程序选择刚才的哪个文件夹并重启chrome。
![](https://raw.githubusercontent.com/qq1073830130/blog/master/2019/4/img/7.png)

## 更新
可以使用最新的hook usedebugvalue 来显示hook数据
<https://zh-hans.reactjs.org/docs/hooks-reference.html#usedebugvalue>
