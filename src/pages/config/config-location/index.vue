<script setup lang="ts">
import './index.scss'
import {Add, ShareN} from "@nutui/icons-vue";
import {onMounted, ref} from "vue";
import {closetModel} from "@/types/closet/closetModel";
import {configLocation} from "@/types/closet/configModel";
import {request} from "../../../service/request";
import Taro from "@tarojs/taro";
import {closetConfigLocation} from "../../../api/closetApi";

console.log('config-type')
const onClick =function (e){
  console.log(e)
  showTop.value=true
}
const checked=ref(false)
const showTop =ref(false)
const val =ref('')

const locations:configLocation[] =ref([])
onMounted(()=>{
  request({
    url: closetConfigLocation,
    method: "GET",
    data: {},
    success: function (res) {
      console.log(res)
    }
  })
})
</script>
<template>
  <nut-navbar   @click-right="onClick">
    <template #right>
     新增部位
    </template>
  </nut-navbar>
  <nut-cell :title="item.name" v-for="item in locations">
    <template #link>
      <nut-switch v-model="checked" />
    </template>
  </nut-cell>
  <nut-overlay v-model:visible="showTop">
    <div class="overlay-body">
      <nut-input v-model="val" placeholder="输入部位" >
        <template #right> <nut-button type="primary" size="small">确认</nut-button> </template>
      </nut-input>
    </div>

  </nut-overlay>
<!--  <nut-input v-model="val" placeholder="请输入分类" >-->
<!--    <template #right> <nut-button type="primary" size="small">新增</nut-button> </template>-->
<!--  </nut-input>-->
</template>
<style>
.overlay-body {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
}
.overlay-content {
  display: flex;
  width: 150px;
  height: 150px;
  background: #fff;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  color: red;
}
</style>
<style scoped lang="scss">

</style>