<script setup lang="ts">
import './index.scss'
import {computed, ref, watchEffect} from "vue";
import {IconFont} from "@nutui/icons-vue";
import {closetModel} from "../../../types/closet/closetModel";

const props =defineProps({
  state:closetModel
})

const emit =defineEmits(['update:state'])
const data = ref([
  {
    title: 'A',
    list: [
      {
        name: 'Armani',
        id: 1
      }
    ]
  },
  {
    title: 'Y',
    list: [
      {
        name: 'YSL',
        id: 2
      }
    ]
  },
  {
    title: '马',
    list: [
      {
        name: '马赛克',
        id: 3
      },

    ]
  },
]);
// 监听 依赖发生变化 更新
watchEffect(() => {
  emit('update:state', props.state)
})
const popupShow=ref(false)
</script>
<template>
  <nut-input class="nut-input-text" v-model="props.state.type" @click="popupShow =true"
             readonly
             placeholder="请选择分类"/>
  <nut-popup position="bottom" v-model:visible="popupShow" :catch-move="true" style="height: 50%">
    <scroll-view class="scroll-view_H" :scroll-y="true">
      <view>
        <nut-cell-group title="上装">
          <template #title>
            <nut-tag>上装</nut-tag>
          </template>
          <nut-cell>
            <nut-radio-group text-position="left" v-model="props.state.type">
              <nut-radio label="大衣">大衣</nut-radio>
              <nut-radio label="羽绒服">羽绒服</nut-radio>
              <nut-radio label="外套">外套</nut-radio>

            </nut-radio-group>
          </nut-cell>
        </nut-cell-group>
        <nut-cell-group title="下装">
          <template #title>
            <nut-tag>下装</nut-tag>
          </template>
          <nut-cell>
            <nut-radio-group text-position="left" v-model="props.state.type">
              <nut-radio label="牛仔裤">牛仔裤</nut-radio>
              <nut-radio label="喇叭裤">喇叭裤</nut-radio>
              <nut-radio label="短裤">短裤</nut-radio>

            </nut-radio-group>
          </nut-cell>
        </nut-cell-group>
        <nut-cell-group title="鞋子">
          <template #title>
            <nut-tag>鞋子</nut-tag>
          </template>
          <nut-cell>
            <nut-radio-group text-position="left" v-model="props.state.type">
              <nut-radio label="皮鞋">皮鞋</nut-radio>
              <nut-radio label="凉鞋">凉鞋</nut-radio>
              <nut-radio label="旅游鞋">旅游鞋</nut-radio>

            </nut-radio-group>
          </nut-cell>
        </nut-cell-group>
        <nut-cell-group title="包包">
          <template #title>
            <nut-tag>包包</nut-tag>
          </template>
          <nut-cell>
            <nut-radio-group text-position="left" v-model="props.state.type">
              <nut-radio label="皮包">皮包</nut-radio>
              <nut-radio label="帆布包">帆布包</nut-radio>
              <nut-radio label="托特包">托特包</nut-radio>

            </nut-radio-group>
          </nut-cell>
        </nut-cell-group>
      </view>
    </scroll-view>
  </nut-popup>

</template>

<style scoped lang="scss">

</style>