<script setup lang="ts">
import { ref, reactive } from 'vue';
import './index.scss'
const dynamicRefForm = ref(null);
// const dynamicForm = {
//   state: reactive({
//     name: '',
//     tels: new Array({
//       key: 1,
//       value: ''
//     })
//   }),
//
//   methods: {
//     submit() {
//       dynamicRefForm.value.validate().then(({ valid, errors }) => {
//         if (valid) {
//           console.log('success', dynamicForm);
//         } else {
//           showToast.warn(errors[0].message);
//           console.log('error submit!!', errors);
//         }
//       });
//     },
//     reset() {
//       dynamicRefForm.value.reset();
//     },
//     remove() {
//       dynamicForm.state.tels.splice(dynamicForm.state.tels.length - 1, 1);
//     },
//     add() {
//       let newIndex = dynamicForm.state.tels.length;
//       dynamicForm.state.tels.push({
//         key: Date.now(),
//         value: ''
//       });
//     }
//   }
// };
const show = ref(false);
const desc = ref('2022年05月10日');
const minDate = new Date(2020, 0, 1);
const maxDate = new Date(2025, 10, 1);
const currentDate = new Date(2022, 4, 10, 10, 10);
const confirm = ({ selectedValue, selectedOptions })=>{
  desc.value = selectedOptions.map((option) => option.text).join('');
}
const clickShow =function (){
  checkShow.value=true

  console.log(show.value)
}
const checkShow=ref(false)
const checkboxgroup1 = ref(['2', '3']);
const checkbox1 = ref(false);
const checkbox2 = ref(false);
</script>
<template>
<view>
  <nut-checkbox-group v-model="checkboxgroup1" >
    312321
    <nut-checkbox label="1">组合复选框</nut-checkbox>
    <nut-checkbox label="2">组合复选框</nut-checkbox>
    <nut-checkbox label="3">组合复选框</nut-checkbox>
    <nut-checkbox label="4">组合复选框</nut-checkbox>
  </nut-checkbox-group>
  4324
<!--  <nut-cell>-->
<!--    <div class="demo-check">当前选中值</div>-->
<!--    <div>{{ checkboxgroup1 }}</div>-->
<!--  </nut-cell>-->
</view>
<!--  <view>-->
<!--&lt;!&ndash;    <nut-form :model-value="dynamicForm.state" ref="dynamicRefForm">&ndash;&gt;-->
<!--&lt;!&ndash;      <nut-form-item label="名称" prop="name" required :rules="[{ required: true, message: '请填写姓名' }]">&ndash;&gt;-->
<!--&lt;!&ndash;        <input class="nut-input-text" v-model="dynamicForm.state.name" placeholder="请输入姓名" type="text" />&ndash;&gt;-->
<!--&lt;!&ndash;      </nut-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;      <nut-form-item label="分类" prop="type" required :rules="[{ required: true, message: '请填写分类' }]">&ndash;&gt;-->
<!--&lt;!&ndash;        <input class="nut-input-text" v-model="dynamicForm.state.name" placeholder="请输入姓名" type="text" />&ndash;&gt;-->
<!--&lt;!&ndash;      </nut-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;      <nut-form-item label="季节" prop="type" required :rules="[{ required: true, message: '请填写季节' }]">&ndash;&gt;-->

<!--&lt;!&ndash;      </nut-form-item>&ndash;&gt;-->

<!--&lt;!&ndash;      <nut-form-item label="颜色" prop="type" required :rules="[{ required: true, message: '请填写季节' }]">&ndash;&gt;-->
<!--&lt;!&ndash;        <input class="nut-input-text" v-model="dynamicForm.state.name" placeholder="请输入姓名" type="text" />&ndash;&gt;-->
<!--&lt;!&ndash;      </nut-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;      <nut-form-item label="收纳位置" prop="type" required :rules="[{ required: true, message: '请填写季节' }]">&ndash;&gt;-->
<!--&lt;!&ndash;        <input class="nut-input-text" v-model="dynamicForm.state.name" placeholder="请输入姓名" type="text" />&ndash;&gt;-->
<!--&lt;!&ndash;      </nut-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;      <nut-form-item label="品牌" prop="type" required :rules="[{ required: true, message: '请填写季节' }]">&ndash;&gt;-->
<!--&lt;!&ndash;        <input class="nut-input-text" v-model="dynamicForm.state.name" placeholder="请输入姓名" type="text" />&ndash;&gt;-->
<!--&lt;!&ndash;      </nut-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;      <nut-form-item label="价格" prop="type" required :rules="[{ required: true, message: '请填写季节' }]">&ndash;&gt;-->
<!--&lt;!&ndash;        <input class="nut-input-text" v-model="dynamicForm.state.name" placeholder="请输入姓名" type="text" />&ndash;&gt;-->
<!--&lt;!&ndash;      </nut-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;      <nut-form-item label="尺码" prop="type" required :rules="[{ required: true, message: '请填写季节' }]">&ndash;&gt;-->
<!--&lt;!&ndash;        <input class="nut-input-text" v-model="dynamicForm.state.name" placeholder="请输入姓名" type="text" />&ndash;&gt;-->
<!--&lt;!&ndash;      </nut-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;      <nut-form-item label="购买日期" prop="type"  required :rules="[{ required: true, message: '请填写季节' }]">&ndash;&gt;-->
<!--&lt;!&ndash;        <nut-cell style="margin-top: -10px;"   :desc="desc" @click="show = true"></nut-cell>&ndash;&gt;-->

<!--&lt;!&ndash;      </nut-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;      <nut-form-item label="标签" prop="type" required :rules="[{ required: true, message: '请填写季节' }]">&ndash;&gt;-->
<!--&lt;!&ndash;        <input class="nut-input-text" v-model="dynamicForm.state.name" placeholder="请输入姓名" type="text" />&ndash;&gt;-->
<!--&lt;!&ndash;      </nut-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;      <nut-form-item label="备注" prop="type" required :rules="[{ required: true, message: '请填写季节' }]">&ndash;&gt;-->
<!--&lt;!&ndash;        <input class="nut-input-text" v-model="dynamicForm.state.name" placeholder="请输入姓名" type="text" />&ndash;&gt;-->
<!--&lt;!&ndash;      </nut-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;      <nut-cell>&ndash;&gt;-->
<!--&lt;!&ndash;        <nut-button size="small" style="margin-right: 10px" @click="dynamicForm.methods.add">添加</nut-button>&ndash;&gt;-->
<!--&lt;!&ndash;        <nut-button size="small" style="margin-right: 10px" @click="dynamicForm.methods.remove">删除</nut-button>&ndash;&gt;-->
<!--&lt;!&ndash;        <nut-button type="primary" style="margin-right: 10px" size="small" @click="dynamicForm.methods.submit">提交</nut-button>&ndash;&gt;-->
<!--&lt;!&ndash;        <nut-button size="small" @click="dynamicForm.methods.reset">重置提示状态</nut-button>&ndash;&gt;-->
<!--&lt;!&ndash;      </nut-cell>&ndash;&gt;-->
<!--&lt;!&ndash;    </nut-form>&ndash;&gt;-->
<!--    <nut-cell title="选择季节"  @click="clickShow "></nut-cell>-->
<!--&lt;!&ndash;    <nut-popup position="bottom" v-model:visible="checkShow" closeable :style="{ height: '20%' }">&ndash;&gt;-->
<!--      1234-->
<!--     <nut-checkbox-group v-model="checkboxgroup1">-->
<!--      <nut-checkbox label="1">组合复选框</nut-checkbox>-->
<!--      <nut-checkbox label="2">组合复选框</nut-checkbox>-->
<!--      <nut-checkbox label="3">组合复选框</nut-checkbox>-->
<!--      <nut-checkbox label="4">组合复选框</nut-checkbox>-->
<!--     </nut-checkbox-group>-->
<!--&lt;!&ndash;    </nut-popup>&ndash;&gt;-->
<!--    <nut-datepicker-->
<!--        v-model="currentDate"-->
<!--        v-model:visible="show"-->
<!--        :min-date="minDate"-->
<!--        :max-date="maxDate"-->
<!--        :is-show-chinese="true"-->
<!--        :three-dimensional="false"-->
<!--        @confirm="confirm"-->
<!--    ></nut-datepicker>-->

<!--  </view>-->

</template>

<style scoped lang="scss">

</style>