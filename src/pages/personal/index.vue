<template>
  <nut-grid :border="false">
    <nut-grid-item >
<!--      <nut-avatar size="large">-->
<!--        <img-->
<!--            src="https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png"-->
<!--        />-->
<!--      </nut-avatar>-->
    </nut-grid-item>
    <nut-grid-item >
     我的衣橱
    </nut-grid-item>
    <nut-grid-item >

    </nut-grid-item>
  </nut-grid>
  <nut-cell title="分类配置" @click="click('type')"></nut-cell>
  <nut-cell title="颜色配置" @click="click"></nut-cell>
  <nut-cell title="品牌配置" @click="click"></nut-cell>
  <nut-cell title="尺码配置" @click="click"></nut-cell>
  <Tabbar></Tabbar>
</template>
<script setup>
import { reactive, ref } from 'vue';
import Tabbar from "../../component/index.vue";
import Taro from "@tarojs/taro";

const click=function (suffix) {
  console.log( '/pages/config/config-'+suffix)
  Taro.navigateTo({
    url: '/pages/config/config-'+suffix+'/index',
  })
}
</script>
