import { createApp } from 'vue'
import store from './store'
import {Button, Toast, InputNumber,  Tabbar, TabbarItem, Collapse, CollapseItem} from '@nutui/nutui-taro';
// taro
import { Form,FormItem,Cell,CellGroup  } from '@nutui/nutui-taro';
import { Grid, GridItem } from '@nutui/nutui-taro';
import { Row, Col } from '@nutui/nutui-taro';
import { Swiper,SwiperItem } from '@nutui/nutui-taro';
import { Avatar } from '@nutui/nutui-taro';
// taro
// taro
import { DatePicker, Picker, Popup } from '@nutui/nutui-taro';
import { Input } from '@nutui/nutui-taro';
import { Checkbox, CheckboxGroup } from '@nutui/nutui-taro';
import { IconFont } from '@nutui/icons-vue-taro';
import './app.scss'
import "@nutui/nutui-taro/dist/styles/variables-jdt.scss";
import {createPinia} from "pinia";
const App = createApp({
  // onShow (options) {},
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})
const pinia = createPinia()
App.use(Button).use(Toast).use(InputNumber).use(store).use(Tabbar).use(TabbarItem)
App.use(Collapse);
App.use(CollapseItem);
App.use(pinia);

const app =App
app.use(IconFont);
app.use(Form);
app.use(FormItem);
app.use(Cell);
app.use(CellGroup);
app.use(Grid);
app.use(GridItem);
app.use(Row);
app.use(Col);
app.use(Swiper);
app.use(SwiperItem);
app.use(Avatar);
app.use(DatePicker);
app.use(Picker);
app.use(Popup);
app.use(Input);
app.use(CheckboxGroup);
app.use(Checkbox);
export default App
