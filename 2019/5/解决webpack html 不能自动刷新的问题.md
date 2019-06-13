> 很久之前出于项目需要，做了一个多页面的[webpack3](https://github.com/Iixianjie/launch-template-vue-cli-v3)配置，遇到在dev-server开发时html不能修改自动更新的问题，多方查找后勉强找到了一个折中的方法，不美观算但是能凑合着用，这段时间看webpack4页稳定了而且据说都快出5就寻思着要是不赶紧弄一个的话真的对不起自己切图仔的身份，于是.... 发现webpack4依然不能使用官方的方法实现这个功能，不过勉强算是找到了不用入侵生产代码的方法，在这里将他们都记录一下。

<br>

首先放一下webpack4的多页面配置[webpack-v4-conf](<https://github.com/Iixianjie/launch-template-webpack-v4>) ,欢迎start😁😁~

<br>



## 解决方式1

首先说下之前在webpack3中的解决方案：

首先需要知道html不能自动更新是因为html-webpack-plugin只是为我们生成html页面，并没有把我们的html页面放到webpack的依赖图里，所以，只要我们把当前页面推到依赖图中就能解决这个问题。

方法很简单，首先配置好对应的loader（因为我使用pug，所以需要配置pug-loader, 如果使用html的话则配置html-loader, 不要使用raw-loader，那会默认的ejs模板语法失效），然后将在主文件中将当前页面作为依赖引入即可,

webpack.config.js

```js
      {
        test: /\.pug$/,
        use: [
          'pug-loader'
        ]
      },
```

<br>

main.js

```js
if (process.env.NODE_ENV !== 'production') {	// 这样在生产模式时这段代码就会被shake调了
  function pageName() {
    var a = location.href
    if (!(/\.html/.test(a))) {	// 防止在跟目录 '/' 不能正确检测 
      return 'index'
    }
    var b = a.split('/')
    var c = b.slice(b.length - 1, b.length).toString(String).split('.')
    return c.slice(0, 1)
  }
  require(`../../html/${pageName()}.pug`)
}
```

这样配置之后，修改html就能自动重载了。如果有不明白的地方可以通过顶部连接查看配置源码。

<br>



## 解决方式2

也算是另辟蹊径的解决方式，好处是不用入侵生产代码

实现代码相当简单:

webpack.dev.js

```js
devServer: {
    contentBase: path.resolve(__dirname, '../src/html'),
}
```

实现原理就是，使用devServer.contentBase把存放html的目录作为静态目录提供这样在修改之后就能自动重载服务啦~ 就跟你平时在contentBase指定的目录里修改图片或者其他东西后server会简单的刷新一样的。因为这里面的文件是不需要webpack编译直接作为静态资源提供的的，所以在检测到更改后webpack只会无脑的重载一下。



如果你已经有一个目录了的话，可以这样配置

```js
devServer: {
    contentBase: [
        path.resolve(__dirname, '../src/html'), 
        path.resolve(__dirname, '../public')],
}
```

<br>



## 解决方式3

同样是设置devServer, 使用了plugin的api来监听编译结束并触发更新。

```js
devServer: {
	before(app, server, compiler) {
       const watchFiles = ['.html', '.pug'];

       compiler.hooks.done.tap('done', () => {
          const changedFiles = Object.keys(compiler.watchFileSystem.watcher.mtimes);

          if (
             this.hot &&
             changedFiles.some(filePath => watchFiles.includes(path.parse(filePath).ext))
          ) {
             server.sockWrite(server.sockets, 'content-changed');
          }
       );
    }
}
```

















