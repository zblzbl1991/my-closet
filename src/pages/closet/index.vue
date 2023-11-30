<script setup lang="ts">
import { ref, reactive } from 'vue';
import './index.scss'
const dynamicRefForm = ref(null);
const dynamicForm = {
  state: reactive({
    name: '',
    tels: new Array({
      key: 1,
      value: ''
    })
  }),

  methods: {
    submit() {
      dynamicRefForm.value.validate().then(({ valid, errors }) => {
        if (valid) {
          console.log('success', dynamicForm);
        } else {
          showToast.warn(errors[0].message);
          console.log('error submit!!', errors);
        }
      });
    },
    reset() {
      dynamicRefForm.value.reset();
    },
    remove() {
      dynamicForm.state.tels.splice(dynamicForm.state.tels.length - 1, 1);
    },
    add() {
      let newIndex = dynamicForm.state.tels.length;
      dynamicForm.state.tels.push({
        key: Date.now(),
        value: ''
      });
    }
  }
};
const show = ref(false);
const desc = ref('2022年05月10日');
const minDate = new Date(2020, 0, 1);
const maxDate = new Date(2025, 10, 1);
const currentDate = new Date(2022, 4, 10, 10, 10);
const confirm = ({ selectedValue, selectedOptions })=>{
  desc.value = selectedOptions.map((option) => option.text).join('');
}

</script>
<template>
    <nut-form :model-value="dynamicForm.state" ref="dynamicRefForm">
      <nut-form-item label="名称" prop="name" required :rules="[{ required: true, message: '请填写姓名' }]">
        <input class="nut-input-text" v-model="dynamicForm.state.name" placeholder="请输入姓名" type="text" />
      </nut-form-item>
      <nut-form-item label="分类" prop="type" required :rules="[{ required: true, message: '请填写分类' }]">
        <input class="nut-input-text" v-model="dynamicForm.state.name" placeholder="请输入姓名" type="text" />
      </nut-form-item>
      <nut-form-item label="季节" prop="type" required :rules="[{ required: true, message: '请填写季节' }]">
        <nut-input
            class="nut-input-text"
            v-model="dynamicForm.state.name"
            @click="show=true"
            readonly
            placeholder="请选择地址"
            type="text"
        />
      </nut-form-item>
      <nut-form-item label="颜色" prop="type" required :rules="[{ required: true, message: '请填写季节' }]">
        <input class="nut-input-text" v-model="dynamicForm.state.name" placeholder="请输入姓名" type="text" />
      </nut-form-item>
      <nut-form-item label="收纳位置" prop="type" required :rules="[{ required: true, message: '请填写季节' }]">
        <input class="nut-input-text" v-model="dynamicForm.state.name" placeholder="请输入姓名" type="text" />
      </nut-form-item>
      <nut-form-item label="品牌" prop="type" required :rules="[{ required: true, message: '请填写季节' }]">
        <input class="nut-input-text" v-model="dynamicForm.state.name" placeholder="请输入姓名" type="text" />
      </nut-form-item>
      <nut-form-item label="价格" prop="type" required :rules="[{ required: true, message: '请填写季节' }]">
        <input class="nut-input-text" v-model="dynamicForm.state.name" placeholder="请输入姓名" type="text" />
      </nut-form-item>
      <nut-form-item label="尺码" prop="type" required :rules="[{ required: true, message: '请填写季节' }]">
        <input class="nut-input-text" v-model="dynamicForm.state.name" placeholder="请输入姓名" type="text" />
      </nut-form-item>
      <nut-form-item label="购买日期" prop="type"  required :rules="[{ required: true, message: '请填写季节' }]">
        <nut-cell style="margin-top: -10px;"   :desc="desc" @click="show = true"></nut-cell>

      </nut-form-item>
      <nut-form-item label="标签" prop="type" required :rules="[{ required: true, message: '请填写季节' }]">
        <input class="nut-input-text" v-model="dynamicForm.state.name" placeholder="请输入姓名" type="text" />
      </nut-form-item>
      <nut-form-item label="备注" prop="type" required :rules="[{ required: true, message: '请填写季节' }]">
        <input class="nut-input-text" v-model="dynamicForm.state.name" placeholder="请输入姓名" type="text" />
      </nut-form-item>
      <nut-cell>
        <nut-button size="small" style="margin-right: 10px" @click="dynamicForm.methods.add">添加</nut-button>
        <nut-button size="small" style="margin-right: 10px" @click="dynamicForm.methods.remove">删除</nut-button>
        <nut-button type="primary" style="margin-right: 10px" size="small" @click="dynamicForm.methods.submit">提交</nut-button>
        <nut-button size="small" @click="dynamicForm.methods.reset">重置提示状态</nut-button>
      </nut-cell>
    </nut-form>
    <nut-datepicker
        v-model="currentDate"
        v-model:visible="show"
        :min-date="minDate"
        :max-date="maxDate"
        :is-show-chinese="true"
        :three-dimensional="false"
        @confirm="confirm"
    ></nut-datepicker>

</template>

<style scoped lang="scss">

</style>