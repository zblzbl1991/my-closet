<template>
  <van-tabbar active="{{active}}" bind:change="onChange">
    <van-tabbar-item name="home" icon="home-o">标签1</van-tabbar-item>
    <van-tabbar-item name="search" icon="search">标签2</van-tabbar-item>
    <van-tabbar-item name="friends" icon="friends-o">标签3</van-tabbar-item>
    <van-tabbar-item name="setting" icon="setting-o">标签4</van-tabbar-item>
  </van-tabbar>
</template>

<script>
import Taro from "@tarojs/taro";
import { computed, ref } from "vue";

export default {
  name:'Tabbar',
  props: {},
  setup() {
    const selected = computed(() => store.getters.getSelected);
    function switchTab(item, index) {
      console.log(index);
      // setSelected(index);
      Taro.switchTab({
        url: list[index].pagePath,
      });
    }
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

    const active =0
    const onChange =function (e){
      console.log(e)
    }
    // function setSelected(index) {
    //   store.dispatch("setSelected", index);
    // }
    return{
      switchTab,
      selected,
      list
    }
  },
};
</script>

<style lang="scss">
</style>
