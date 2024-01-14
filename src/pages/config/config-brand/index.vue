<script setup lang="ts">
import './index.scss'
// import {ref} from "vue/dist/vue";
import {request} from "../../../service/request";
import {closetConfigBrand, closetConfigBrands} from "../../../api/closetApi";
import Taro from "@tarojs/taro";
import {onMounted, ref} from "vue";

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
            Taro.navigateBack(/*{
                delta: 2
              }*/)

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
<!--  <nut-overlay v-model:visible="show">-->
<!--    <div class="overlay-body">-->
<!--      <div class="overlay-content">text</div>-->
<!--    </div>-->
<!--  </nut-overlay>-->
<!--  <nut-navbar title="品牌" @click-right="addBrand(brands)">-->
<!--    <template #right>-->
<!--     <p style="color: black">新增</p>-->
<!--    </template>-->
<!--  </nut-navbar>-->
<!--  <nut-swipe v-if="brands&&brands.length>0" v-for="t in brands">-->
    <nut-cell round-radius="0" style="height: 100%" :title="t.name" v-for="t in brands" >
      <template #default>
        <nut-input readonly v-if="t.id" v-model="t.name"/>
<!--        <nut-input v-else v-model="typeVal" placeholder="输入品牌">-->
<!--          <template #right>-->
<!--            <nut-button type="primary" size="small" @click="saveBrand">确认</nut-button>-->
<!--          </template>-->
<!--        </nut-input>-->
      </template>
    </nut-cell>
<!--    <template #right>-->
<!--      <nut-button shape="square" style="height: 100%" type="danger" @click="deleteBrand(t.id)">删除</nut-button>-->
<!--    </template>-->
<!--  </nut-swipe>-->
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