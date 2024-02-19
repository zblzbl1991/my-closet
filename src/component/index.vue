<template>
  <div style="height: 50px"></div>
  <nut-tabbar @tab-switch="switchTab" v-model="selected" bottom>
    <nut-tabbar-item v-for="(item,index) in list" :tab-title="item.text">
      <template #icon>
        <!--          <Home></Home>-->
      </template>
    </nut-tabbar-item>
  </nut-tabbar>
</template>

<script>
import Taro from "@tarojs/taro";
import { computed, ref } from "vue";
import { useStore } from "vuex";

export default {
  name:'Tabbar',
  props: {},
  setup() {
    const store = useStore();
    const selected = computed(() => store.getters.getSelected);
    function switchTab(item, index) {
      console.log(index);
      setSelected(index);
      Taro.switchTab({
        url: list[index].pagePath,
      });
    }
    const active=ref(null)
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
        text: '灵感穿搭'
      },
      {
        pagePath: '/pages/statistics/index',
        // selectedIconPath: '../images/tabbar_cate_on.png',
        // iconPath: '../images/tabbar_cate.png',
        text: '统计'
      },
      {
        pagePath: '/pages/my-clock/index',
        // selectedIconPath: '../images/tabbar_cate_on.png',
        // iconPath: '../images/tabbar_cate.png',
        text: '打卡'
      },
      {
        pagePath: '/pages/personal/index',
        // selectedIconPath: '../images/tabbar_cate_on.png',
        // iconPath: '../images/tabbar_cate.png',
        text: '个人中心'
      },
    ]
    function setSelected(index) {
      store.dispatch("setSelected", index);
    }
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
