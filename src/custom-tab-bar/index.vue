<script setup lang="ts">
import Taro from '@tarojs/taro'
import {computed, ref} from 'vue'
import { useStore } from "vuex";

// const store = useStore()
// const selected = computed(() =>{} /*store.getters.getSelected*/)
const store = useStore();
const color = '#000000'
const selectedColor = '#DC143C'
const list = [
  {
    pagePath: '/pages/index/index',
    // selectedIconPath: '../images/tabbar_home_on.png',
    // iconPath: '../images/tabbar_home.png',
    text: '我的首页'
  },
  {
    pagePath: '/pages/my-closet/index',
    // selectedIconPath: '../images/tabbar_cate_on.png',
    // iconPath: '../images/tabbar_cate.png',
    text: '我的衣橱'
  },
  {
    pagePath: '/pages/my-fashion/index',
    // selectedIconPath: '../images/tabbar_cate_on.png',
    // iconPath: '../images/tabbar_cate.png',
    text: '我的穿搭'
  },
]
const selected = computed(() => store.getters.getSelected);
function setSelected(index) {
  store.dispatch("setSelected", index);
}
function switchTab(item,index) {
  setSelected(index);
  Taro.switchTab({ url:list[index].pagePath,success:(res)=>{
      // 页面 onShow 时
      const pageObj = Taro.getCurrentInstance().page
      const tabbar = Taro.getTabBar(pageObj)
    }})
}

</script>
<script lang="ts">
export default {
  name:'Tabbar'
}

</script>

<template >
    <nut-tabbar v-model:visible="selected" @tab-switch="switchTab"   bottom>
      <nut-tabbar-item v-for="(item,index) in list" :tab-title="item.text">
<!--        <template #icon>-->
<!--&lt;!&ndash;          <Home></Home>&ndash;&gt;-->
<!--        </template>-->
      </nut-tabbar-item>
    </nut-tabbar>
</template>

<style scoped lang="scss">
// 为了让你们的tabbar正常显示手动引入的样式表
@import "@nutui/nutui-taro/dist/packages/tabbar/index.scss";
@import "@nutui/nutui-taro/dist/packages/tabbaritem/index.scss";
//@import "./nuticon.scss";
</style>
