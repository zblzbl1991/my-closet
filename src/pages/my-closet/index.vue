<script setup lang="ts">
import {computed, reactive, ref} from 'vue';
import Tabbar from "../../custom-tab-bar/index.vue";
import {useStore} from "vuex";
import { useDidShow } from '@tarojs/taro'
const activeNames = ref([1, 2]);
const title = reactive({
  title1: '标题1',
  title2: '标题2',
  title3: '标题3'
});
const onChange = (modelValue, currName, status) => {
  // currName: 当前操作的 collapse-item 的 name
  // status: true 打开 false 关闭
  console.log(modelValue, currName, status);
};
const selected = computed(() => useStore().getters.getSelected);
console.log('selected',selected.value)
useDidShow(() => {
  console.log('onShow')
})
console.log('---')
</script>

<template>
  <nut-collapse v-model="activeNames" @change="onChange">
    <nut-collapse-item :name="1">
      <template #title> {{ title.title1 }} </template>
      NutUI是一套拥有京东风格的轻量级的 Vue 组件库
    </nut-collapse-item>
    <nut-collapse-item :title="title.title2" :name="2">
      在产品的功能、体验、易用性和灵活性等各个方面做了全面的升级！
    </nut-collapse-item>
    <nut-collapse-item :title="title.title3" :name="3" disabled> </nut-collapse-item>
  </nut-collapse>
  <Tabbar ></Tabbar>
</template>

<style scoped lang="scss">

</style>