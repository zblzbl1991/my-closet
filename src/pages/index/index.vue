<template>
  <nut-menu>
    <nut-menu-item v-model="val2" :options="options2" @change="onChange"/>
  </nut-menu>
  <nut-cell-group v-for="(item,key) in dataList" v-show="computedLength(item)>0">
    <nut-cell>
      <template #title>
        <span>  {{ key }}  <b style="color: red"> {{ computedLength(item) }}</b>个</span>
      </template>
    </nut-cell>
    <nut-row type="flex" wrap="nowrap" justify="center">
      <scroll-view class="scroll-view_H" :scroll-y="true" @scroll="scroll" style="width: 100%">
        <nut-collapse>
          <nut-collapse-item :name="index" :title="computedCollapseName(index,closet.length)"
                             v-for="(closet,index) in item">
            <nut-grid :column-num="3" direction="horizontal" :square="true" gutter="2">
              <nut-grid-item v-for="(c,cKey) in closet">
                <image :onTap="click" :id="c.id" lazyLoad="true"
                       style="width: 100px;height: 80px;background: #fff;margin-right: 10px"
                       :src="c.images[0]?c.images[0].thumbUrl?c.images[0].thumbUrl:c.images[0].url:'../'"></image>
              </nut-grid-item>
            </nut-grid>
          </nut-collapse-item>
          <!--        <view v-for="(closet,index) in item">-->
          <!--          <image  v-for="(closet,index) in item" :onTap="click" :id="closet.id"-->
          <!--                 style="width: 150px;height: 100px;background: #fff;margin-right: 10px"-->
          <!--                 :src="closet.images[0]?closet.images[0].thumbUrl?closet.images[0].thumbUrl:closet.images[0].url:'../'"-->
        </nut-collapse>
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
import {computed, onMounted, ref} from "vue";
import Taro from "@tarojs/taro";
import {request} from "../../service/request";
import {useDidShow} from '@tarojs/taro'
import {useOpenidStore, useSessionKeyStore, useTokenStore} from "../../store/wechat";
import {closetTypes} from "../../api/closetApi";
import './index.scss'
import './index'
import {login} from "@/pages/index/index";

const computedLength = computed(() => (item) => {
  let arrLength = 0
  for (var val in item) {
    let itemElement = item[val];
    if(itemElement!=null){

      arrLength += itemElement.length
    }
  }
  return arrLength;
})
const computedCollapseName = computed(() => (item, length) => {
  return item + ' ' + length + '个'
})
const scroll = function (e) {
}
const click = function (e) {
  let id = e.mpEvent.target.id;
  Taro.navigateTo({
    url: '/pages/closet/index?id=' + id,
  })
}
//菜单排序
const options2 = ref([
  {text: '默认排序', value: 'default'},
  {text: '价格从高到低', value: 'priceDesc'},
  {text: '价格从低到高', value: 'priceAsc'}
])
const val2 = ref('default')
const onChange = (val) => {
  console.log('val', val)
  getData()
}


const handleClick = function () {
  // 点击按钮时触发的逻辑
  console.log('按钮被点击了');
  // 跳转到目的页面，打开新页面
  Taro.navigateTo({
    url: '/pages/closet/index',
  })
}


const defaultImg = ref('')
const dataList = ref()
const typeList = ref();
const getData = () => {
  request({
    url: '/closet/',
    data:{
      sort:val2.value
    },
    success: function (res) {
      dataList.value = res.data.data
    }
  })
};

const getTypes = () => {
  request({
    url: closetTypes,

    success: function (res) {
      // console.log('分类:',res.data)
      typeList.value = res.data.data
      getData()
      // console.log(res.data)
    }
  })
}
onMounted(() => {
  Taro.showLoading({
    title: '加载中',
  })
  login(getTypes)
})


// const login = function () {
//
//   // extracted();
// }
useDidShow(() => {
  if (useOpenidStore.val) {
    getTypes()
  }

})

</script>