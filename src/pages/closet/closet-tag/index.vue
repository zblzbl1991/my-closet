<script setup lang="ts">
import './index.scss'
import {computed, ref, watchEffect} from "vue";
import {IconFont} from "@nutui/icons-vue";
import {closetModel} from "@/types/closet/closetModel";

const props =defineProps({
  state:closetModel
})

const emit =defineEmits(['update:state'])

// 监听 依赖发生变化 更新
watchEffect(() => {
  emit('update:state', props.state)
})
const tagComputed = computed(() => {
  return props.state.value.tag.map((val) => val).join(',');
})
const popupShow=ref(false)
</script>
<template>
<!--  <nut-input class="nut-input-text" v-model="props.state.value.tag" @click="popupShow =true"-->
<!--             readonly-->
<!--             placeholder="请选择分类"/>-->
  <nut-input class="nut-input-text" v-model="tagComputed" @click="popupShow =true"
             readonly
             placeholder="请选择标签"/>
  <nut-popup position="bottom" v-model:visible="popupShow" :catch-move="true" style="height: 50%">
      <nut-checkbox-group v-model="props.state.value.tag">
        <nut-checkbox label="好看" shape="button">好看</nut-checkbox>
        <nut-checkbox label="性价比高" shape="button">性价比高</nut-checkbox>
      </nut-checkbox-group>

  </nut-popup>

</template>

<style scoped lang="scss">

</style>