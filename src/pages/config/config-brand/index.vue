<script setup lang="ts">
import './index.scss'
// import {ref} from "vue/dist/vue";
import {request} from "../../../service/request";
import {closetConfigBrand, closetConfigBrands} from "../../../api/closetApi";
import Taro from "@tarojs/taro";
import {onMounted, ref} from "vue";
import {deleteType} from "@/pages/config/config-type/index";

const onClick =function (e){
  console.log(e)
}
const show =ref(false)
onMounted(()=>{
  getBrands()
})
const brands=ref([])
const typeVal =ref('')
const addBrand = function (types) {
  console.log(types)
  show.value=true
}
const getBrands=function (){
  request({
    url: closetConfigBrands,
    method: "GET",
    data: {
    },
    success: function (res) {
      console.log(res.data.data)
      brands.value=res.data.data
    }
  })
}
const saveBrand=function (locationId){
  request({
    url: closetConfigBrand,
    method: "POST",
    data: {
      name: typeVal.value,
      // locationId:locationId
    },
    success: function (res) {
      console.log(res)
      getBrands()
      typeVal.value=''
    }
  })
}
const deleteBrand=function (id){
  console.log('id',id)
  Taro.showModal({
    title: '提示',
    content: '是否删除？',
    success: function (res) {
      if (res.confirm) {
        request({
          url:closetConfigBrand+'/'+id,
          method:'DELETE',
          success: function (res) {
            getBrands()
          }
        })
        console.log('用户点击确定')
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })
}
</script>
<template>
<!--    <nut-cell round-radius="0" :title="t.name" v-for="t in brands" >-->
      <view v-for="t in brands">
        <nut-input readonly v-if="t.id" v-model="t.name">
          <template #right> <nut-button type="primary" size="small" @click="deleteBrand(t.id)">删除</nut-button> </template>
        </nut-input>
      </view>
  <nut-popup :style="{ padding: '30px 50px' }" v-model:visible="show">正文</nut-popup>
<!--      <template #default>-->
<!--      </template>-->
<!--    </nut-cell>-->
  <nut-cell class="r">
    <nut-input v-model="typeVal" placeholder="输入品牌">
      <template #right>
        <nut-button type="primary" size="small" @click="saveBrand">确认</nut-button>
      </template>
    </nut-input>
  </nut-cell>
</template>

<style>
.r {
  position: fixed;
  bottom: 0;
  z-index: 100;
}
</style>
<style scoped lang="scss">

</style>