<script setup lang="ts">
import './index.scss'
import {computed, ref, watchEffect} from "vue";
import {IconFont} from "@nutui/icons-vue";
import {closetModel} from "../../../types/closet/closetModel";

const props =defineProps({
  state:closetModel
})

const emit =defineEmits(['update:state','update:show'])

// 监听 依赖发生变化 更新
watchEffect(() => {
  emit('update:state', props.state)
})
const popupShow=ref(false)
</script>
<template>
  <nut-input class="nut-input-text" v-model="props.state.color" @click="popupShow =true"
             readonly
             placeholder="请选择颜色"/>
  <nut-popup position="bottom" v-model:visible="popupShow">
    <nut-cell-group>
      <nut-cell>
        <nut-radio-group v-model="props.state.color">
          <nut-radio label="黑色系">黑色系<IconFont name="check-normal"  color="#000000"></IconFont ></nut-radio>
          <nut-radio label="白色系" >白色系<IconFont name="check-checked"  color="#FFFFFF"></IconFont ></nut-radio>
          <nut-radio label="红色系" >红色系<IconFont name="check-normal"  color="#FF0000"></IconFont ></nut-radio>
        </nut-radio-group>
      </nut-cell>
    </nut-cell-group>
  </nut-popup>

</template>

<style scoped lang="scss">

</style>