<script setup lang="ts">
import './index.scss'
import {computed, onMounted, ref, watchEffect} from "vue";
import {IconFont} from "@nutui/icons-vue";
import {closetModel} from "@/types/closet/closetModel";
import {request} from "../../../service/request";
import {closetConfigBrands, closetConfigBrandsGroup} from "../../../api/closetApi";

const props = defineProps({
  state: closetModel
})

const emit = defineEmits(['update:state'])
const brands=ref([])
const getBrands=function (){
  request({
    url: closetConfigBrandsGroup,
    method: "GET",
    data: {
    },
    success: function (res) {
      console.log(res.data.data)
      brands.value=res.data.data
      console.log('brands',brands)
      console.log('data',data)
      data.value=res.data.data
      // data.value.push(res.data.data)
    }
  })
}
onMounted(()=>{
  getBrands()
})
const data = ref([
  {
    title: 'A',
    list: [
      {
        name: 'Armani',
        id: 1
      }
    ]
  }

]);
// 监听 依赖发生变化 更新
watchEffect(() => {
  emit('update:state', props.state)
})
const clickItem = (key, item) => {
  console.log(key, item);
  props.state.value.brand = item.name
  popupShow.value = false
};

const clickIndex = (key) => {
  console.log(key);
};

const popupShow = ref(false)
</script>
<template>
  <nut-input class="nut-input-text" readonly @click="popupShow =true" v-model="props.state.value.brand"
             placeholder="请输入品牌" type="text"/>
  <nut-popup position="bottom" v-model:visible="popupShow" style="height: 50%">
    <scroll-view class="scroll-view_H" :scroll-y="true"  >
        <nut-elevator :index-list="data" height="100%"  @click-item="clickItem" @click-index="clickIndex">
          <template #default="slotProps">
            <!--              <Jd width="12px"></Jd>-->
            <span :style="{ marginLeft: '15px' }">{{ slotProps.item.name }}</span>
          </template>
        </nut-elevator>
    </scroll-view>
  </nut-popup>

</template>

<style scoped lang="scss">

</style>