
@[TOC]

react-transition-group与其他react动画框架相比优势还是比较明显的，体积非常小，gzip之后只有5k不到、只提供动画状态，具体的动画实现完全由自己掌控，对于业务开发这点是很重要的，在只需要一些基础的页面、组件基础动效时直接用js和css实现，涉及一些交互效果比较多的页面时可以通过提供的钩子很好的接入TweenMax这样的动画库，可以说是非常有弹性了。

# 动画的4个基本阶段

1. 'entering'   ->  进场动画正在进行
2. 'entered'   ->  进场动画执行完成
3. 'exiting'   ->  离场动画正在进行
4. 'exited'   ->  离场动画完成

<br>

# Transtion 组件
对于于基本的转换效果，使用transtion已经足够

## 基本示例
```js
import { CSSTransition } from 'react-transition-group'
const duration = 300

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0
}

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 }
}


<Transition in={this.state.show} timeout={duration}>    // 在in属性指向的状态被切换时,触发切换动画
    {state => (    // 内部接收一个函数，传入当前的动画状态作为参数， 如entering、entered
     <div className="test" style={{ ...defaultStyle, ...transitionStyles[state] }}>test</div>
    )}
</Transition>
```

<br>

## props
#### children
<fn | ele>   required

接收一个function作为children，当转换状态发生转换时调用此function，并将当前状态作为参数传入

<br>

#### in   
<bool =  false>

触发进入或退出状态

<br>

#### mountOnEnter
<bool = false>

默认情况子组件与transtion组件一起加载(也就是说即使in属性为false，组件也会先以隐藏状态(exited)正常加载)，当mountOnEnter 为true时，会在第一次in属性为true时加载子组件

<br>

#### unmountOnExit
<bool = false>
在过渡结束后卸载组件, 测试发现这里确实卸载了子组件生成的dom节点，但是并不会触发componentWillUnmount钩子，在子组件重新进入entered状态时也不会重新触发componentDidMount等创建阶段钩子

<br>

#### appear
<bool = false>

内部组件将在transtion加载后立即执行一次转换

<br>

#### enter
<bool = true>

是否开启进入转换(关闭后不进入entering状态，直接进入entered状态)

* 注意当appear 为true时此设置不会生效

<br>

#### exit
<bool = true>

是否开启退出转换，与enter相反

<br>

#### timeout
<number | { enter?: number, exit?: number, appear?: number }>

转换的持续时间，可以传入对象以更细粒度的控制动画持续时间, 如果未传入addEndListener  属性，此项为必传字段

<br>

#### addEndListener
<fn(node, done)>

用于手动触发动画结束状态的事件以允许你更细粒度的控制动画状态，传入改属性时，timeout属性扔作为后备属性生效。

```js
addEndListener={(node, done) => {
  // use the css transitionend event to mark the finish of a transition
  node.addEventListener('transitionend', done, false);
}}
```

<br>


#### onEnter
<fn(node, isAppearing)>

进入entering状态之前触发的回调, 在第一次mount时会传入isAppearing判断是否开启appear 选项

<br>

#### onEntering  *
<fn(node, isAppearing)>

进入entering状态后触发的回调（也就是开始调用entering后触发）

<br>

#### onEntered
<fn(node, isAppearing)>

进入entered状态后触发的回调

<br>

#### onExit
<fn(node)>

在exit状态前触发的回调

<br>

#### onExiting
<fn(node)>

在进入exiting状态后触发的回调

<br>

#### onExited
<fn(node)>

在进入exited状态后触发的回调


<br>
<br>

# CSSTransition
根据当前的动画状态为动画元素添加对应的类名, 依赖于Transition组件，除非特别说明，否则接受来自Transtion组件的所有prop

## 各阶段的名词解释及包含类名

* enter    ->    进入触发之前
  * enter
  * appear    ->  appear 系列的类名只在第一次进入时生效
* entering    ->    进入动画开始到结束的过程中
  * enter-active
  * appear-active
* entered    ->    进入动画完成
  * enter-done
  * appear-done
* exit    ->    结束动画触发钱
  * exit
* exiting    ->    结束动画开始到结束的过程中
  * exit-active
* exited    ->    结束动画完成
  * exit-done

  
<br>

## props

#### classNames
<str | { appear?: string, appearActive?: string, enter?: string, enterActive?: string, enterDone?: string, exit?: string, exitActive?: string, exitDone?: string, }>

在动画进行的各个阶段添加对象阶段的类名, 如果不传则作用去掉前缀的默认类名如：enter-active、enter-done

<br>

例: 当classNames="fade" 时适用于以下类
```js
.fade-appear    // 初次进入前的状态, 注意在初次进入时，appear和 enter 相关的类名会在第一次动画时同时生效
.fade-appear-active    // 初次进入中的状态
.fade-appear-done    // 初次进入后的状态

.fade-enter            // 开始过渡时生效,元素被插入前
.fade-enter-active     // 开始过渡时的状态
.fade-enter-done       // 过渡结束后的状态

.fade-exit             // 离开过渡的开始状态,元素被插入前
.fade-exit-active      // 离开过渡生效时的状态
.fade-exit-done        // 离开过渡的结束状态
```

<br>

也可以单独为每个阶段指定不同的类名

```js
classNames={{
 appear: 'my-appear',
 appearActive: 'my-active-appear',
 enter: 'my-enter',
 enterActive: 'my-active-enter',
 enterDone: 'my-done-enter,
 exit: 'my-exit',
 exitActive: 'my-active-exit',
 exitDone: 'my-done-exit,
}}
```

<br>

使用cssModule时，可以在文件中以驼峰命名的方式直接写以上的类名，然后通过spread运算符直接使用
```js
import styles from './styles.css';

// classNames={{ ...styles }}
```


<br>
<br>

# TransitionGroup
TrannstionGroup没有定义任何动画行为，列表项如何动画全是都当前项的Transition决定

## 通过css动画非常简单的实现列表过渡
[https://stackblitz.com/edit/react-rtuurv](https://stackblitz.com/edit/react-rtuurv)

## props

#### component
<any = div>

选择生成的包装元素，如果不想要包装元素，传入null

#### children
一组Transition或cssTransition组件，在 in 、进入、离开时触发动画。

#### appear
禁用或启用所有子项的初次登场动画

#### enter
禁用或启用所有子项的进入动画

#### exit
禁用或启用所有子项的离场动画

#### childFactory

可以在此回调中更新动画元素,接收原本要渲染的ReactElement，返回要渲染的新ReactElement
<fn(ReactElement) => ReactElement>

```html
<TransitionGroup appear childFactory={el => <div>被替换的元素</div>}>
```

