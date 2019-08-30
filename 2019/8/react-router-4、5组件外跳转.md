使用Router自定义history即可

```js
import { Router } from 'react-router-dom';
import { createBrowserHistory, createHashHistory } from 'history';

// 根据需要选择hash还是h5路由, 然后就能在组件外通过history.push进行编程式导航了
const history = createBrowserHistory();

// -<BowserRouter>  使用Router代替原来使用的
<Router history={history}>
  //...
</Router>

```