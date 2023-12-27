<script setup lang="ts">
import './index.scss'
import {ref, watchEffect} from "vue";
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

const colorList = ref([
  {text: '黑色', vaule: '1', bgColor: '#000000', color: '#fff'},
  {text: '白色', vaule: '2', bgColor: '#ffffff', color: '#333'},
  {text: '红色', vaule: '3', bgColor: '#ff0000', color: '#fff'},
  {text: '粉色', vaule: '4', bgColor: '#ff00ff', color: '#333'},
  {text: '粉红色', vaule: '5', bgColor: '#FFC0CB', color: '#FFC0CB'},
  {text: '橙红色', vaule: '5', bgColor: '#FF4500', color: '#fff'},
  {text: '蓝色', vaule: '5', bgColor: '#0000ff', color: '#fff'},
  {text: '湖蓝色', vaule: '5', bgColor: '#00FFFF', color: '#fff'},
  {text: '宝蓝色', vaule: '5', bgColor: '#4169E1', color: '#fff'},
  {text: '绿色', vaule: '5', bgColor: '#008000', color: '#fff'},
  {text: '草绿色', vaule: '5', bgColor: '#7CFC00', color: '#fff'},
  {text: '橄榄绿色', vaule: '5', bgColor: '#808000', color: '#fff'},
  {text: '黄色', vaule: '5', bgColor: '#FFFF00', color: '#fff'},
  {text: '柠檬黄', vaule: '5', bgColor: '#FFFACD', color: '#fff'},
  {text: '金黄色', vaule: '5', bgColor: '#FFD700', color: '#fff'},
  {text: '紫色', vaule: '5', bgColor: '#800080', color: '#fff'},
  {text: '浅紫色', vaule: '5', bgColor: '#BA55D3', color: '#fff'},
  {text: '深紫色', vaule: '5', bgColor: '#4B0082', color: '#fff'},
  {text: '深紫色', vaule: '5', bgColor: '#4B0082', color: '#fff'},
  {text: '灰色', vaule: '5', bgColor: '#808080', color: '#fff'},
  {text: '浅灰色', vaule: '5', bgColor: '#D3D3D3', color: '#fff'},
  {text: '深灰色', vaule: '5', bgColor: '#A9A9A9', color: '#fff'},
  {text: '棕色', vaule: '5', bgColor: '#A52A2A', color: '#fff'},
  {text: '浅棕色', vaule: '5', bgColor: '#D2691E', color: '#fff'},
  {text: '深棕色', vaule: '5', bgColor: '#8B4513', color: '#fff'},
])
const popupShow = ref(false)
</script>
<template>

  <nut-input class="nut-input-text" v-model="props.state.value.color" @click="popupShow =true"
             readonly
             placeholder="请选择颜色"/>

  <nut-popup position="bottom" v-model:visible="popupShow" :catch-move="true" style="height: 50%">
    <scroll-view class="scroll-view_H" :scroll-y="true">
      <view>

        <nut-cell-group>
          <nut-cell>
            <nut-radio-group v-model="props.state.value.color" @change="onChange">
              <nut-radio :label="item.text" v-for="item in colorList">
                <div style="display: flex;align-items: center"><p class="radio-span"
                                                                  :style="{background: item.bgColor}"></p>
                  {{ item.text }}
                </div>
              </nut-radio>

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