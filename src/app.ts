import { createApp } from 'vue'
import store from './store'
import {Button, Toast, InputNumber, Icon, Tabbar, TabbarItem, Collapse, CollapseItem} from '@nutui/nutui-taro';

import './app.scss'

const App = createApp({
  onShow (options) {},
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})

App.use(Button).use(Toast).use(InputNumber).use(Icon).use(store).use(Tabbar).use(TabbarItem)
App.use(Collapse);
App.use(CollapseItem);

export default App
