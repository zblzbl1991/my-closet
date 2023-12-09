<script setup lang="ts">
import './index.scss'
import {computed, ref, watchEffect} from "vue";

const props =defineProps({
  show:Object,
  state:Object
})

const emit =defineEmits(['update:state','update:show'])

// 监听 依赖发生变化 更新
watchEffect(() => {
  emit('update:state', props.state)
  emit('update:show', props.show)
})
// const checkSeasonShow =ref(false)
// const clickShow =function (){
//   checkSeasonShow.value=true
// }
const seasonComputed = computed(() => {
  return props.state.season.map((val) => val).join(',');
})
const showCheck=function (value){
  console.log(value)
}
const show =ref(false)
const handlerClose =function (e){
  console.log(e)
}
</script>
<template>
  <view>
    {{show.season}}
    {{state.season}}
  </view>
  <nut-popup position="bottom" v-model:visible="props.show.season" :click-pop="handlerClose" :click-overlay="handlerClose" :close="handlerClose" :style="{ height: '20%' }">
    <nut-checkbox-group v-model="props.state.season" @change="showCheck">
      <nut-checkbox label="春季" shape="button">春季</nut-checkbox>
      <nut-checkbox label="夏季" shape="button">夏季</nut-checkbox>
      <nut-checkbox label="秋季" shape="button">秋季</nut-checkbox>
      <nut-checkbox label="冬季" shape="button">冬季</nut-checkbox>
    </nut-checkbox-group>

  </nut-popup>

</template>

<style scoped lang="scss">

</style>