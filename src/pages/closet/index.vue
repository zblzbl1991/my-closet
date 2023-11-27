<script setup lang="ts">
import { ref, reactive } from 'vue';
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
</script>

<template>
  <nut-form :model-value="dynamicForm.state" ref="dynamicRefForm">
    <nut-form-item label="姓名" prop="name" required :rules="[{ required: true, message: '请填写姓名' }]">
      <input class="nut-input-text" v-model="dynamicForm.state.name" placeholder="请输入姓名" type="text" />
    </nut-form-item>
    <nut-form-item :label="'联系方式'+index" :prop="'tels.' + index + '.value'" required
                   :rules="[{ required: true, message: '请填写联系方式'+index }]" :key="item.key"
                   v-for="(item,index) in dynamicForm.state.tels">
      <input class="nut-input-text" v-model="item.value" :placeholder="'请输入联系方式'+index" type="text" />
    </nut-form-item>
    <nut-cell>
      <nut-button size="small" style="margin-right: 10px" @click="dynamicForm.methods.add">添加</nut-button>
      <nut-button size="small" style="margin-right: 10px" @click="dynamicForm.methods.remove">删除</nut-button>
      <nut-button type="primary" style="margin-right: 10px" size="small" @click="dynamicForm.methods.submit">提交</nut-button>
      <nut-button size="small" @click="dynamicForm.methods.reset">重置提示状态</nut-button>
    </nut-cell>
  </nut-form>
</template>

<style scoped lang="scss">

</style>