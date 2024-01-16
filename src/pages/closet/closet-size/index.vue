<script setup lang="ts">
import './index.scss'
import {ref, watchEffect} from "vue";
import {IconFont} from "@nutui/icons-vue";
import {closetModel} from "@/types/closet/closetModel";

const props = defineProps({
  state: closetModel
})

const emit = defineEmits(['update:state', 'update:show'])

// 监听 依赖发生变化 更新
watchEffect(() => {
  emit('update:state', props.state)
})
const onChange = function () {
  popupShow.value = false
}

const sizeList=ref([
  {text:'S'},
  {text:'M'},
  {text:'L'},
])
const shoseSizeList =ref([
  {text:'37'},
  {text:'38'},
  {text:'39'}
])
const popupShow = ref(false)
</script>
<template>

  <nut-input class="nut-input-text" v-model="props.state.value.size" @click="popupShow =true"
             readonly
             placeholder="请选择尺码"/>

  <nut-popup position="bottom" v-model:visible="popupShow" :catch-move="true" style="height: 50%">
    <scroll-view class="scroll-view_H" :scroll-y="true">
      <view>

        <nut-cell-group title="衣服">
          <nut-cell>
            <nut-radio-group v-model="props.state.value.size" @change="onChange" direction="horizontal">
              <nut-radio :label="item.text" v-for="item in sizeList" shape="button" size="mini">{{item.text}}</nut-radio>
            </nut-radio-group>
          </nut-cell>
        </nut-cell-group>
        <nut-cell-group title="鞋子">
          <nut-cell>
            <nut-radio-group v-model="props.state.value.size" @change="onChange" direction="horizontal">
              <nut-radio :label="item.text" v-for="item in shoseSizeList" shape="button" size="mini">{{item.text}}</nut-radio>
            </nut-radio-group>
          </nut-cell>
        </nut-cell-group>
      </view>
    </scroll-view>
  </nut-popup>

</template>
<style>
.radio-span {
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.3);
  margin-right: 6px;
  position: relative;
  border: 1px solid #000000;

}
</style>
<style scoped lang="scss">
.circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 2px solid black;
  background-color: red;
}

.radio-text {
  font-size: 15px;
  color: #333;
  border-radius: 4px;
  padding: 4px 22px 4px 10px;
  line-height: 18px;
  border: 1px solid #666;
}

</style>