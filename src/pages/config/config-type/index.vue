<script setup lang="ts">
import './index.scss'
import {Add, ShareN} from "@nutui/icons-vue";
import {onMounted, ref} from "vue";
import {closetModel} from "@/types/closet/closetModel";
import {configLocation} from "@/types/closet/configModel";
import {request} from "../../../service/request";
import Taro from "@tarojs/taro";
import {closetConfigLocation, closetConfigTypes} from "../../../api/closetApi";
import {addType, deleteLocation, deleteType, getLocations, saveLocation} from "@/pages/config/config-type/index";
import {useLocationsStore} from "../../../store/closet";

const onClick = function (e) {
  console.log(e)
  showTop.value = true
}
const showTop = ref(false)
const val = ref('')
const typeVal = ref('')
const locations: configLocation[] = ref([])
onMounted(() => {
  useLocationsStore.val=locations
  getLocations(locations)
})


const saveType = function (locationId) {
  request({
    url: closetConfigTypes,
    method: "POST",
    data: {
      name: typeVal.value,
      locationId: locationId
    },
    success: function (res) {
      console.log(res)
      getLocations(locations)
      typeVal.value = ''
    }
  })
}

</script>
<template>
  <view v-for="item in locations">
    <nut-cell :title="item.name">
      <template #link>
        <nut-button type="info" size="small" @click="addType(item.types)">新增</nut-button>
        <nut-button type="danger" size="small" @click="deleteLocation(item.id)">删除</nut-button>
      </template>
    </nut-cell>
<!--    <nut-swipe-group lock>-->
<!--      <nut-swipe v-if="item.types&&item.types.length>0" v-for="t in item.types">-->
        <view  v-if="item.types&&item.types.length>0" v-for="t in item.types">
          <nut-input readonly v-if="t.id" v-model="t.name">
            <template #right> <nut-button type="primary" size="small" @click="deleteType(t.id)">删除</nut-button> </template>
          </nut-input>
            <nut-input v-else v-model="typeVal" placeholder="输入分类">
              <template #right>
                <nut-button type="primary" size="small" @click="saveType(item.id)">确认</nut-button>
              </template>
            </nut-input>
        </view>
<!--        <template #right>-->
<!--          <nut-button shape="square" style="height: 100%" type="danger" @click="deleteType(t.id)">删除</nut-button>-->
<!--        </template>-->
<!--      </nut-swipe>-->
<!--    </nut-swipe-group>-->
  </view>

  <nut-input v-model="val" placeholder="输入部位">
    <template #right>
      <nut-button type="primary" size="small" @click="saveLocation(val,locations)">确认</nut-button>
    </template>
  </nut-input>
</template>
<style>
.nut-navbar__right {
  color: black;
}
:root{
  --nut-cell-line-height: 15px
}
.overlay-body {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
}

.overlay-content {
  display: flex;
//width: 150px; height: 150px; background: #fff; border-radius: 8px; align-items: center; justify-content: center; color: red;
}
</style>
<style scoped lang="scss">

</style>