<script setup lang="ts">
import './index.scss'
import {Add, ShareN} from "@nutui/icons-vue";
import {onMounted, ref} from "vue";
import {closetModel} from "@/types/closet/closetModel";
import {configLocation} from "@/types/closet/configModel";
import {request} from "../../../service/request";
import Taro from "@tarojs/taro";
import {closetConfigLocation, closetConfigTypes} from "../../../api/closetApi";

const onClick = function (e) {
  console.log(e)
  showTop.value = true
}
const showTop = ref(false)
const val = ref('')
const typeVal =ref('')
const locations: configLocation[] = ref([])
onMounted(() => {
  getLocations()
})
const getLocations = function () {
  request({
    url: closetConfigLocation,
    method: "GET",
    data: {},
    success: function (res) {
      console.log(res)
      locations.value = res.data.data
    }
  })
}
const saveLocation = function () {
  request({
    url: closetConfigLocation,
    method: "POST",
    data: {
      name: val.value
    },
    success: function (res) {
      console.log(res)
      getLocations()
    }
  })
}
const saveType=function (locationId){
  request({
    url: closetConfigTypes,
    method: "POST",
    data: {
      name: typeVal.value,
      locationId:locationId
    },
    success: function (res) {
      console.log(res)
      getLocations()
      typeVal.value=''
    }
  })
}
const addType = function (types) {
  console.log(types)
  types.push({})
}
const deleteType=function (id){
  console.log('id',id)
  Taro.showModal({
    title: '提示',
    content: '是否删除？',
    success: function (res) {
      if (res.confirm) {
        request({
          url:closetConfigTypes+'/'+id,
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
  <view v-for="item in locations">
    <nut-cell :title="item.name">
      <template #link>
        <nut-button type="primary" size="small" @click="addType(item.types)">新增</nut-button>


      </template>
    </nut-cell>
    <nut-swipe v-if="item.types&&item.types.length>0" v-for="t in item.types">
      <nut-cell round-radius="0" style="height: 100%" :title="t.name" >
      <template #default>
        <nut-input readonly v-if="t.id" v-model="t.name"/>
        <nut-input v-else v-model="typeVal" placeholder="输入分类">
          <template #right>
            <nut-button type="primary" size="small" @click="saveType(item.id)">确认</nut-button>
          </template>
        </nut-input>
      </template>
      </nut-cell>
      <template #right>
        <nut-button shape="square" style="height: 100%" type="danger" @click="deleteType(t.id)">删除</nut-button>
      </template>
    </nut-swipe>
  </view>

  <nut-input v-model="val" placeholder="输入部位">
    <template #right>
      <nut-button type="primary" size="small" @click="saveLocation">确认</nut-button>
    </template>
  </nut-input>
</template>
<style>
.nut-navbar__right {
  color: black;
}

.overlay-body {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
}

.overlay-content {
  display: flex;
//width: 150px; height: 150px; background: #fff; border-radius: 8px; align-items: center; justify-content: center;
  color: red;
}
</style>
<style scoped lang="scss">

</style>