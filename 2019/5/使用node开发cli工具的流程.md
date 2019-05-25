<!-- TOC -->

- [前置知识](#前置知识)
  - [常用的包](#常用的包)
  - [常用知识点](#常用知识点)
- [开发流程](#开发流程)
  - [step0](#step0)
  - [step1](#step1)
  - [step2](#step2)
  - [step3](#step3)
  - [step4](#step4)
  - [step5](#step5)
- [看代码学习](#看代码学习)

<!-- /TOC -->

<br>


> 本文只适用于不知道怎么做和做什么的人

<br>

## 前置知识

### 常用的包

* commander		生成git风格的指令，简化解析用户输入的命令和指令的流程。
* inquirer 		收集用户输入信息
* ora 		美化加载和操作结果等信息
* chalk 		美化输出，设置输出背景色等

<br>

### 常用知识点

* path包的基本使用
* 使用fs执行简单的文件操作
* 使用child_process.exec执行shell命令
* 使用process.cwd定位进程执行的目录
* 使用process.chdir更改当前进程的所在目录

<br>

## 开发流程

### step0

创建文件夹，创建必要文件

```shell
-| hello-cli
	-| package.json
	-| hello.js
```

<br>

### step1

指定node为该脚本的解释程序 

hello.js

```js
#!/usr/bin/env node
console.log('hello');
```

<br>

### step2

在package.json中配置bin, 当一个包pageage中存在bin时，安装该包会同时在node的bin目录生成一个可执行文件。

```js
{
    "bin": {
        "hello": "./hello.js"
    }
}
```

<br>

### step3

在项目目录执行npm的link命令，实现类似于本地安装的效果，执行成功后，可以在node的bin目录看到名为hello的执行文件

```shell
npm link

// 通过bin命令查看目录位置
// npm bin -g	
```

<br>

### step4

执行完link后，无论在何处开启命令行都能直接执行hello命令了，修改之后执行命令也能马上看到效果。

<br>

### step5

开发完成并检查无误后，直接publish到npm即可发布，因为package存在bin字段，在使用者全局安装包后就可以直接执行到该命令。

<br>

## 看代码学习

<https://github.com/Iixianjie/launch-cli> - 根据配置模板智能生成项目，只包含上面提到的知识点。









