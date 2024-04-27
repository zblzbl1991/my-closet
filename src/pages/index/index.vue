<template>
  <nut-menu>
    <nut-menu-item v-model="params.sort" :options="options2" @change="onChange"/>
    <nut-menu-item ref="item" title="搜索">
      <div :style="{ display: 'flex', flex: 1, 'justify-content': 'space-between', 'align-items': 'center' }">
        <!--        <div :style="{ marginRight: '10px' }">自定义内容</div>-->
        <nut-input v-model="params.search" :border="false"/>
        <nut-button @click="handleSearch">确认</nut-button>
      </div>
    </nut-menu-item>
  </nut-menu>
  <nut-cell-group v-for="(item,key) in dataList" v-show="computedLength(item)>0">
    <nut-cell>
      <template #title>
        <span>  {{ key }}  <b style="color: red"> {{ computedLength(item) }}</b>个</span>
      </template>
    </nut-cell>
    <nut-row type="flex" wrap="nowrap" justify="center">
      <scroll-view class="scroll-view_H" :scroll-y="true" @scroll="scroll" style="width: 100%">
        <!--        <nut-side-navbar>-->
        <!--          <nut-sub-side-navbar :name="index" :title="computedCollapseName(index,closet.length)"-->
        <!--                               v-for="(closet,index) in item">-->
        <nut-space direction="vertical" fill v-for="(closet,index) in item">
           {{ computedCollapseName(index, closet.length) }}
          <!--        <nut-divider >{{computedCollapseName(index,closet.length)}} </nut-divider>-->
          <nut-grid :column-num="3" direction="horizontal" :square="true" gutter="2">
            <nut-grid-item v-for="(c,cKey) in closet">
              <image :onTap="click" :id="c.id" lazyLoad="true"
                     style="width: 100px;height: 80px;background: #fff;margin-right: 10px"
                     :src="c.images&&c.images[0]?c.images[0].thumbUrl?c.images[0].thumbUrl:c.images[0].url:'../'"></image>

            </nut-grid-item>
          </nut-grid>
        </nut-space>
        <!--          </nut-sub-side-navbar>-->
        <!--        </nut-side-navbar>-->
        <!--        <nut-collapse>-->
        <!--          <nut-collapse-item :name="index" :title="computedCollapseName(index,closet.length)"-->
        <!--                             v-for="(closet,index) in item">-->
        <!--            <nut-grid :column-num="3" direction="horizontal" :square="true" gutter="2">-->
        <!--              <nut-grid-item v-for="(c,cKey) in closet">-->
        <!--                <image :onTap="click" :id="c.id" lazyLoad="true"-->
        <!--                       style="width: 100px;height: 80px;background: #fff;margin-right: 10px"-->
        <!--                       :src="c.images[0]?c.images[0].thumbUrl?c.images[0].thumbUrl:c.images[0].url:'../'"></image>-->
        <!--              </nut-grid-item>-->
        <!--            </nut-grid>-->
        <!--          </nut-collapse-item>-->
        <!--          &lt;!&ndash;        <view v-for="(closet,index) in item">&ndash;&gt;-->
        <!--          &lt;!&ndash;          <image  v-for="(closet,index) in item" :onTap="click" :id="closet.id"&ndash;&gt;-->
        <!--          &lt;!&ndash;                 style="width: 150px;height: 100px;background: #fff;margin-right: 10px"&ndash;&gt;-->
        <!--          &lt;!&ndash;                 :src="closet.images[0]?closet.images[0].thumbUrl?closet.images[0].thumbUrl:closet.images[0].url:'../'"&ndash;&gt;-->
        <!--        </nut-collapse>-->
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
import {computed, onMounted, reactive, ref} from "vue";
import Taro from "@tarojs/taro";
import {request} from "../../service/request";
import {useDidShow} from '@tarojs/taro'
import {useOpenidStore, useSessionKeyStore, useTokenStore} from "../../store/wechat";
import {closetTypes} from "../../api/closetApi";
import './index.scss'
import './index'
import {login, options2} from "@/pages/index/index";

const computedLength = computed(() => (item) => {
  let arrLength = 0
  for (var val in item) {
    let itemElement = item[val];
    if (itemElement != null) {

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

const params = reactive({
  sort: 'default',
  search: ''
})
//菜单排序

const onChange = (val) => {
  console.log('val', val)
  getData()
}

//搜索
const item = ref()
const handleSearch = function () {
  getData()
  item.value.toggle()
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
    data: params,
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