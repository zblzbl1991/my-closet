<script setup lang="ts">
import './index.scss'
import {computed, onMounted, ref, watchEffect} from "vue";
import {IconFont} from "@nutui/icons-vue";
import {closetModel} from "../../../types/closet/closetModel";
import {request} from "../../service/request";
import {closetTypes} from "../../api/closetApi";

const props =defineProps({
  state:closetModel
})

const emit =defineEmits(['update:state'])

const types=ref()
onMounted(()=>{
  request({
    url:closetTypes,
    success: function (res) {
      // console.log('分类:',res.data)
      // typeList.value=res.data.data
      // getData()
      console.log(res.data.data)
      types.value=res.data.data
    }
  })
})
// 监听 依赖发生变化 更新
watchEffect(() => {
  emit('update:state', props.state)
})
const onChange =function (){
  popupShow.value=false
}
const popupShow=ref(false)
</script>
<template>
  <nut-input class="nut-input-text" v-model="props.state.value.type" @click="popupShow =true"
             readonly
             placeholder="请选择分类"/>
  <nut-popup position="bottom" v-model:visible="popupShow" :catch-move="true" style="height: 50%">
    <scroll-view class="scroll-view_H" :scroll-y="true">
      <view>
        <nut-cell-group :title="key" v-for="(item,key) in types">
          <template #title>
            <nut-tag>{{key}}</nut-tag>
          </template>
          <nut-cell>
            <nut-radio-group text-position="left" v-model="props.state.value.type" @change="onChange">
              <nut-radio :label="type" v-for="type in item">{{type}}</nut-radio>

            </nut-radio-group>
          </nut-cell>
        </nut-cell-group>
      </view>
    </scroll-view>
  </nut-popup>

</template>

<style scoped lang="scss">

</style>