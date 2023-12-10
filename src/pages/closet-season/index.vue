<script setup lang="ts">
import './index.scss'
import {computed, ref, watchEffect} from "vue";

const props =defineProps({
  state:Object
})

const emit =defineEmits(['update:state','update:show'])

// 监听 依赖发生变化 更新
watchEffect(() => {
  emit('update:state', props.state)
})
const seasonComputed = computed(() => {
  return props.state.season.map((val) => val).join(',');
})
const popupShow=ref(false)
</script>
<template>
  <nut-input class="nut-input-text" v-model="seasonComputed"  @click="popupShow =true"
             readonly
             placeholder="请选择季节"/>
  <nut-popup position="bottom" v-model:visible="popupShow"  :style="{ height: '20%' }">
    <nut-checkbox-group v-model="props.state.season">
      <nut-checkbox label="春季" shape="button">春季</nut-checkbox>
      <nut-checkbox label="夏季" shape="button">夏季</nut-checkbox>
      <nut-checkbox label="秋季" shape="button">秋季</nut-checkbox>
      <nut-checkbox label="冬季" shape="button">冬季</nut-checkbox>
    </nut-checkbox-group>

  </nut-popup>

</template>

<style scoped lang="scss">

</style>