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
const clickItem = (key, item) => {
  console.log(key, item);
  props.state.brand=item.name
};

const clickIndex = (key) => {
  console.log(key);
};
const popupShow=ref(false)
</script>
<template>
  <nut-input class="nut-input-text" readonly @click="popupShow =true" v-model="props.state.brand" placeholder="请输入品牌" type="text"/>
  <nut-popup position="bottom" v-model:visible="popupShow">
    <nut-elevator :index-list="data" :height="260" @click-item="clickItem" @click-index="clickIndex">
      <template #default="slotProps">
        <!--              <Jd width="12px"></Jd>-->
        <span :style="{ marginLeft: '15px' }">{{ slotProps.item.name }}</span>
      </template>
    </nut-elevator>
  </nut-popup>

</template>

<style scoped lang="scss">

</style>