<template>
  <nut-cell-group >
    <nut-cell title="上衣">
      <template #link>
        <nut-icon name="category"></nut-icon>
<!--        <nut-switch v-model="checked" />-->
      </template>
    </nut-cell>
  </nut-cell-group>
  <nut-row type="flex" wrap="nowrap"  justify="center">
    <scroll-view class="scroll-view_H" :scroll-x="true" @scroll="scroll" style="width: 100%">
      <image :onTap="click" :id="1321"
          style="width: 150px;height: 100px;background: #fff;"
          src="https://camo.githubusercontent.com/3e1b76e514b895760055987f164ce6c95935a3aa/687474703a2f2f73746f726167652e333630627579696d672e636f6d2f6d74642f686f6d652f6c6f676f2d3278313531333833373932363730372e706e67"
      />
      <image
          style="width: 150px;height: 100px;background: #fff;"
          src="https://camo.githubusercontent.com/3e1b76e514b895760055987f164ce6c95935a3aa/687474703a2f2f73746f726167652e333630627579696d672e636f6d2f6d74642f686f6d652f6c6f676f2d3278313531333833373932363730372e706e67"
      />
      <image
          style="width: 150px;height: 100px;background: #fff;"
          src="https://camo.githubusercontent.com/3e1b76e514b895760055987f164ce6c95935a3aa/687474703a2f2f73746f726167652e333630627579696d672e636f6d2f6d74642f686f6d652f6c6f676f2d3278313531333833373932363730372e706e67"
      />
      <image
          style="width: 150px;height: 100px;background: #fff;"
          src="https://camo.githubusercontent.com/3e1b76e514b895760055987f164ce6c95935a3aa/687474703a2f2f73746f726167652e333630627579696d672e636f6d2f6d74642f686f6d652f6c6f676f2d3278313531333833373932363730372e706e67"
      />
      <image
          style="width: 150px;height: 100px;background: #fff;"
          src="https://camo.githubusercontent.com/3e1b76e514b895760055987f164ce6c95935a3aa/687474703a2f2f73746f726167652e333630627579696d672e636f6d2f6d74642f686f6d652f6c6f676f2d3278313531333833373932363730372e706e67"
      />
      <image
          style="width: 150px;height: 100px;background: #fff;"
          src="https://camo.githubusercontent.com/3e1b76e514b895760055987f164ce6c95935a3aa/687474703a2f2f73746f726167652e333630627579696d672e636f6d2f6d74642f686f6d652f6c6f676f2d3278313531333833373932363730372e706e67"
      />
    </scroll-view>
  </nut-row>
  <nut-cell-group >
    <nut-cell title="裤子">
      <template #link>
        <nut-icon name="add"></nut-icon>
        <!--        <nut-switch v-model="checked" />-->
      </template>
    </nut-cell>
  </nut-cell-group>
  <nut-row type="flex" wrap="nowrap"  justify="center">
    <scroll-view class="scroll-view_H" :scroll-x="true" @scroll="scroll" style="width: 100%">

    </scroll-view>
  </nut-row>
  <nut-cell-group >
    <nut-cell title="鞋子">
      <template #link>
        <nut-icon name="add"></nut-icon>
        <!--        <nut-switch v-model="checked" />-->
      </template>
    </nut-cell>
  </nut-cell-group>
  <nut-row type="flex" wrap="nowrap"  justify="center">
    <scroll-view class="scroll-view_H" :scroll-x="true" @scroll="scroll" style="width: 100%">

    </scroll-view>
  </nut-row>
  <div class="add-button" @click="handleClick">
    +
  </div>
  <Tabbar></Tabbar>
</template>
<script setup>
import Tabbar from "../../component/index.vue";
import {ref} from "vue";
import Taro from "@tarojs/taro";

const checked = ref(true);
 const scroll=function (e){
   console.log('scroll:', e)
 }
 const click =function (e){
    console.log(e)
 }
const handleClick= function () {
  // 点击按钮时触发的逻辑
  console.log('按钮被点击了');
  // 跳转到目的页面，打开新页面
  Taro.navigateTo({
    url: '/pages/closet/index',
  })
}

const getData =function (res){

   const data=res.data;
  data
}
</script>
<style>
.scroll-view_H{
  white-space: nowrap;
}
.float-button {
  position: fixed;
  bottom: 150px;
  right: 20px;
  width: 50px;
  height: 50px;
  background-color: #007bff;
  color: #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.add-button {
  position: fixed;
  bottom: 150px;
  right: 20px;
  width: 50px;
  height: 50px;
  background-color: #007bff;
  color: #fff;
  border-radius: 50%;
  text-align: center;
  line-height: 50px;
  font-size: 40px;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 999;
}
</style>