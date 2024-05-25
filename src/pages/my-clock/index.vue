<script setup lang="ts">
import {onMounted, ref} from 'vue';
import Tabbar from "../../component/index.vue";
import Taro from "@tarojs/taro";
import {getMarkers, savePoint} from "@/pages/my-clock/index";


const mapCtx = Taro.createMapContext('map')
onMounted(() => {
  getMarkers(markers,mapCtx)
});

const openChooseLocation=function () {
  Taro.chooseLocation({

    success:res=>{
      console.log(1111,res.name)
      if(res.name){

        show.value=true
        formData.value.name=res.name
        formData.value.address=res.address
        formData.value.longitude=res.longitude
        formData.value.latitude=res.latitude
        console.log(formData)
      }
      // savePoint(res)
    },
    fail:res=>{

    }
  })
}
const formData = ref({
  name: '',
  address: '',
  level: '',
  reviews: '',
  info: '',
  defaultFileList:[],
  longitude:0,
  latitude:0
})
const markers =ref( [
])
const polyline=ref([{
  points: [
  ],
  color:"#FF0000DD",
  width: 2,
  dottedLine: true
}])

const show =ref(false)
//添加打卡位置
const regionchange=function (e) {
  console.log(e.type)
}

const markertap =function (e) {
  console.log("markertap:", e.detail.markerId)
}
const onClick = () => {
  console.log('[Navbar]: on click right');
  openChooseLocation()
};
</script>

<template>
  <nut-navbar title="我的记录" desc="打卡" @click-right="onClick"></nut-navbar>
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
  <nut-popup v-model:visible="show" :style="{ padding: '30px 50px' }">
    <nut-form>
      <nut-form-item label="名称">
        <nut-input v-model="formData.name" placeholder="请输入名称" type="text" />
      </nut-form-item>
      <nut-form-item label="地址">
        <nut-input v-model="formData.address" placeholder="请输入地址" type="text" />
      </nut-form-item>
      <nut-form-item label="星级">
        <nut-rate v-model="formData.level" />
      </nut-form-item>
      <nut-form-item label="评价">
        <nut-input v-model="formData.reviews" placeholder="请输入评价" type="text" />
      </nut-form-item>
      <nut-form-item label="价格">
        <nut-input v-model="formData.info" placeholder="请输入备注" type="text" />
      </nut-form-item>
      <nut-form-item label="图片">
        <nut-uploader
            v-model:file-list="formData.defaultFileList"
            url="http://服务地址"
            accept="image/*"
            maximum="3"
            multiple
        >
        </nut-uploader>
      </nut-form-item>
    </nut-form>
  </nut-popup>
  <Tabbar></Tabbar>
</template>
<style lang="scss">
:root,
page{
  --nut-cell-desc-color: black
}
.overlay-body {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
}
.overlay-content {
  display: flex;
  //width: 150px;
  //height: 150px;
  background: #fff;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  color: red;
}
</style>
<style scoped lang="scss">

</style>