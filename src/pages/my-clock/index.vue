<script setup lang="ts">
import {reactive, toRefs, onMounted, ref} from 'vue';
import Tabbar from "../../component/index.vue";
import Taro from "@tarojs/taro";

onMounted(() => {
  setTimeout(() => {
    Taro.chooseLocation({

      success:res=>{
        console.log(1111,res)
      },
      fail:res=>{

      }
    })
  }, 500);
});

const markers =ref( [{
  // iconPath: "https://avatars2.githubusercontent.com/u/1782542?s=460&u=d20514a52100ed1f82282bcfca6f49052793c889&v=4",
  id: 0,
  longitude: 113.02,
  latitude: 28.07,
  // width: 50,
  // height: 50
},{
  id:1,
  longitude: 113.01,
  latitude: 28.07,
}])
const polyline=ref([{
  points: [{
    longitude: 113.3245211,
    latitude: 23.10229
  }, {
    longitude: 113.324520,
    latitude: 23.21229
  }],
  color:"#FF0000DD",
  width: 2,
  dottedLine: true
}])
const getMarkers =function () {

}
const show =ref(true)

const regionchange=function (e) {
  console.log(e.type)
}

const markertap =function (e) {
  console.log("markertap:", e.detail.markerId)
}
const onClick = () => {
  console.log('[Navbar]: on click right');
};
</script>

<template>
  <nut-navbar title="Title" desc="Share" @click-right="onClick"></nut-navbar>
  <map
      id="map"
      style="width: 100%; height: 100vh;"
      longitude="113.02"
      latitude="28.07"
      scale="14"
      :markers="markers"
      :polyline="polyline"
      :show-location="true"
      @regionchange="regionchange"
      @markertap="markertap"
  />
  <nut-popup v-model:visible="show" position="bottom" :style="{ height: '20%' }">
    <span>肯德基</span>
    <span>麦当劳</span>
    <span>汉堡王</span>
  </nut-popup>
  <Tabbar></Tabbar>
</template>

<style scoped lang="scss">

</style>