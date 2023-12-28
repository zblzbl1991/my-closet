<script setup lang="ts">
import './index.scss'
import {computed, onMounted, ref, watchEffect} from "vue";
import {IconFont} from "@nutui/icons-vue";
import {closetModel} from "@/types/closet/closetModel";
import {request} from "../../../service/request";
import {closetTypes} from "../../../api/closetApi";

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
const confirm = ({selectedValue, selectedOptions}) => {
  props.state.value.purchaseDate = selectedOptions.map((option) => option.text).join('');
  popupShow.value = false
}
const minDate = new Date(2000, 0, 1);
const maxDate = new Date();
const currentDate = new Date();
const onChange =function (){
  popupShow.value=false
}
const popupShow=ref(false)
</script>
<template>
  <nut-input class="nut-input-text" v-model="props.state.value.purchaseDate" @click="popupShow =true"
             readonly
             placeholder="请选择购买日期"/>
  <nut-popup position="bottom" v-model:visible="popupShow">
    <nut-date-picker
        v-model="currentDate"
        v-model:visible="popupShow"
        :min-date="minDate"
        :max-date="maxDate"
        :is-show-chinese="true"
        :three-dimensional="false"
        @confirm="confirm"
    ></nut-date-picker>
  </nut-popup>
</template>

<style scoped lang="scss">

</style>