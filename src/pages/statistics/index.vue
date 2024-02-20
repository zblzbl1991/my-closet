<template>
  <nut-tabs @change="handlerChange" v-model="value">
    <nut-tab-pane title="按部位" pane-key="LOCATION">
      <nut-cell v-for="item in tabList" :title="item.typeName" :desc="getResult(item)"></nut-cell>
    </nut-tab-pane>
    <nut-tab-pane title="按类型" pane-key="TYPE">
      <nut-cell v-for="item in tabList" :title="item.typeName" :desc="getResult(item)"></nut-cell>
    </nut-tab-pane>
    <nut-tab-pane title="按时间" pane-key="DATE">
      <nut-cell v-for="item in tabList" :title="item.typeName" :desc="getResult(item)"></nut-cell>
    </nut-tab-pane>
  </nut-tabs>

  <Tabbar></Tabbar>
</template>
<script setup>
import {computed, onMounted, reactive, ref} from 'vue';
import Tabbar from "../../component/index.vue";
import Taro from "@tarojs/taro";
import {request} from "../../service/request";
import {closetTypeGroup} from "../../api/closetApi";
const value = ref('LOCATION');
const click=function (suffix) {
  //跳转去明细页面
  // Taro.navigateTo({
  //   url: '/pages/config/config-'+suffix+'/index',
  // })
}
const getResult =function (item) {
 const length= item.closetList.length
  let res=0
  if(item.closetList.length>0){
    res = item.closetList.map(closet=>closet.price).reduce((total, num) => total + num);
  }
  return `${length} | ￥${res} >`
}
const handlerChange =function (res) {
  tabList.value=[]
  getData(res.paneKey)

}
const tabList =ref([])
onMounted(()=>{
  getData(value.value)
})
const getData = (type) => {
  request({
    url:`${closetTypeGroup}/${type}`,
    success: function (res) {
      console.log(res.data.data)
      tabList.value=res.data.data
      // dataList.value=res.data.data
    }
  })
};
</script>
