<template>

  <nut-cell-group v-for="(item,key) in dataList">
    <nut-cell >
      <template #title>
      <span>  {{key}}  <b style="color: red"> {{item.length}}</b>个</span>
      </template>
    </nut-cell>
    <nut-row type="flex" wrap="nowrap"  justify="center">
      <scroll-view class="scroll-view_H" :scroll-x="true" @scroll="scroll" style="width: 100%">
<!--        <view v-for="(closet,index) in item">-->
          <image  v-for="(closet,index) in item" :onTap="click" :id="closet.id"
                 style="width: 150px;height: 100px;background: #fff;margin-right: 10px"
                 :src="closet.images[0]?closet.images[0].thumbUrl?closet.images[0].thumbUrl:closet.images[0].url:'https://camo.githubusercontent.com/3e1b76e514b895760055987f164ce6c95935a3aa/687474703a2f2f73746f726167652e333630627579696d672e636f6d2f6d74642f686f6d652f6c6f676f2d3278313531333833373932363730372e706e67'"
          />
      </scroll-view>
    </nut-row>
  </nut-cell-group>


  <div class="add-button" @click="handleClick">
    +
  </div>
  <Tabbar></Tabbar>
</template>
<script setup>
import Tabbar from "../../component/index.vue";
import {onMounted, ref} from "vue";
import Taro from "@tarojs/taro";
import {request} from "../../service/request";
import { useDidShow } from '@tarojs/taro'
import {useOpenidStore, useSessionKeyStore, useTokenStore} from "../../store/wechat";
import {closetTypes} from "../../api/closetApi";

const scroll=function (e){
   console.log('scroll:', e)
 }
 const click =function (e){
   let id = e.mpEvent.target.id;
   console.log(id)
   Taro.navigateTo({
     url: '/pages/closet/index?id='+id,
   })
 }
const handleClick= function () {
  // 点击按钮时触发的逻辑
  console.log('按钮被点击了');
  // 跳转到目的页面，打开新页面
  Taro.navigateTo({
    url: '/pages/closet/index',
  })
}
const defaultImg=ref('')
const  dataList =ref()
const typeList =ref();
const getData = () => {
  request({
    url:'/closet/',
    success: function (res) {
      console.log('dataList',res.data.data)
      dataList.value=res.data.data
    }
  })
};

 const getTypes=()=>{
   request({
     url:closetTypes,
     success: function (res) {
       // console.log('分类:',res.data)
       typeList.value=res.data.data
       getData()
       // console.log(res.data)
     }
   })
 }
onMounted(()=>{
login()
})

const login=function () {
  Taro.login({
    success: function (res) {
      if (res.code) {
        //发起网络请求
        request({
          url: '/wx/user/wxc7a91a709ffd2852/login',
          data: {
            code: res.code
          },success:function (res) {
            let data = res.data;
            console.log(data.data)

            useOpenidStore.val=data.data.openid
            useSessionKeyStore.val=data.data.sessionKey
            useTokenStore.val=data.data.token

            getTypes()
          }
        })
      } else {
        console.log('登录失败！' + res.errMsg)
      }
    }
  })
}
useDidShow(() => {
  console.log('onShow')
  getTypes()
})

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