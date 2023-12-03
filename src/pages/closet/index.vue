<script setup lang="ts">
import {computed, reactive, ref} from 'vue';
import './index.scss'

const dynamicRefForm = ref(null);
const dynamicForm = {
  state: reactive({
    //名称
    name: '',
    //分类
    type:'',
    //颜色
    color:'',
    //收纳位置
    position:'',
    //季节
    season:[],
    //品牌
    brand:'',
    //价格
    price:'',
    //尺码
    size:'',
    //购买日期
    purchaseDate:'',
    //标签
    tag:[],
    //备注
    remarks:''
  }),

  methods: {
    submit() {
      dynamicRefForm.value.validate().then(({ valid, errors }) => {
        if (valid) {
          console.log('success', dynamicForm);
        } else {
          // showToast.warn(errors[0].message);
          console.log('error submit!!', errors);
        }
      });
    },
    reset() {
      dynamicRefForm.value.reset();
    },
    // remove() {
    //   dynamicForm.state.tels.splice(dynamicForm.state.tels.length - 1, 1);
    // },
    // add() {
    //   let newIndex = dynamicForm.state.tels.length;
    //   dynamicForm.state.tels.push({
    //     key: Date.now(),
    //     value: ''
    //   });
    // }
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
const seasonComputed=computed(()=>{
  if(dynamicForm.state.season.length===0){
    return '请选择季节'
  }
  return dynamicForm.state.season.map((val) => val).join(',');
})
const checkSeasonShow=ref(false)
const checkTypeShow=ref(false)
const checkColorShow=ref(false)
</script>
<template>
  <view>
    <nut-form :model-value="dynamicForm.state" ref="dynamicRefForm">
      <nut-form-item label="名称" prop="name" required :rules="[{ required: true, message: '请填写名称' }]">
        <input class="nut-input-text" v-model="dynamicForm.state.name" placeholder="请输入名称" type="text" />
      </nut-form-item>
      <nut-form-item label="分类" prop="type" required :rules="[{ required: true, message: '请填写分类' }]">
        <input class="nut-input-text" v-model="dynamicForm.state.type"   @click="checkTypeShow =true"
               readonly
               placeholder="请选择分类" />
      </nut-form-item>
      <nut-form-item label="季节" prop="type" required :rules="[{ required: true, message: '请填写季节' }]">
        <nut-cell :desc="seasonComputed"  @click="checkSeasonShow=true "></nut-cell>

      </nut-form-item>

      <nut-form-item label="颜色" prop="type" required :rules="[{ required: true, message: '请填写颜色' }]">
        <input class="nut-input-text" v-model="dynamicForm.state.name" placeholder="请输入姓颜色" type="text" />
      </nut-form-item>
      <nut-form-item label="收纳位置" prop="type" required :rules="[{ required: true, message: '请填写收纳位置' }]">
        <input class="nut-input-text" v-model="dynamicForm.state.name" placeholder="请输入收纳位置" type="text" />
      </nut-form-item>
      <nut-form-item label="品牌" prop="type" required :rules="[{ required: true, message: '请填写品牌' }]">
        <input class="nut-input-text" v-model="dynamicForm.state.name" placeholder="请输入品牌" type="text" />
      </nut-form-item>
      <nut-form-item label="价格" prop="type" required :rules="[{ required: true, message: '请填写价格' }]">
        <input class="nut-input-text" v-model="dynamicForm.state.name" placeholder="请输入价格" type="text" />
      </nut-form-item>
      <nut-form-item label="尺码" prop="type" required :rules="[{ required: true, message: '请填写尺码' }]">
        <input class="nut-input-text" v-model="dynamicForm.state.name" placeholder="请输入尺码" type="text" />
      </nut-form-item>
      <nut-form-item label="购买日期" prop="type"  required :rules="[{ required: true, message: '请填写购买日期' }]">
        <nut-cell style="margin-top: -10px;"   :desc="desc" @click="show = true"></nut-cell>
        <nut-datepicker
            v-model="currentDate"
            v-model:visible="show"
            :min-date="minDate"
            :max-date="maxDate"
            :is-show-chinese="true"
            :three-dimensional="false"
            @confirm="confirm"
        ></nut-datepicker>
      </nut-form-item>
      <nut-form-item label="标签" prop="type" required :rules="[{ required: true, message: '请填写标签' }]">
        <input class="nut-input-text" v-model="dynamicForm.state.name" placeholder="请输入标签" type="text" />
      </nut-form-item>
      <nut-form-item label="备注" prop="type" required :rules="[{ required: true, message: '请填写备注' }]">
        <input class="nut-input-text" v-model="dynamicForm.state.name" placeholder="请输入备注" type="text" />
      </nut-form-item>
      <nut-cell>
<!--        <nut-button size="small" style="margin-right: 10px" @click="dynamicForm.methods.add">添加</nut-button>-->
<!--        <nut-button size="small" style="margin-right: 10px" @click="dynamicForm.methods.remove">删除</nut-button>-->
        <nut-button type="primary" style="margin-right: 10px" size="small" @click="dynamicForm.methods.submit">提交</nut-button>
        <nut-button size="small" @click="dynamicForm.methods.reset">重置提示状态</nut-button>
      </nut-cell>
    </nut-form>

    <nut-popup position="bottom" v-model:visible="checkSeasonShow" closeable :style="{ height: '20%' }">
      <nut-checkbox-group v-model="dynamicForm.state.season">
        <nut-checkbox label="春季" shape="button">春季</nut-checkbox>
        <nut-checkbox label="夏季" shape="button">夏季</nut-checkbox>
        <nut-checkbox label="秋季" shape="button">秋季</nut-checkbox>
        <nut-checkbox label="冬季" shape="button">冬季</nut-checkbox>
      </nut-checkbox-group>

    </nut-popup>
    <nut-popup position="bottom" v-model:visible="checkTypeShow" closeable  :catch-move="true" style="height: 40%" >
<!--      <nut-cell>  <nut-tag>上装</nut-tag></nut-cell>-->
      <view>
      <scroll-view class="scroll-view_H" :scroll-y="true"  style="width: 40%">
      <nut-radio-group v-model="dynamicForm.state.type">
        <nut-cell title="大衣"> <nut-radio label="大衣" shape="button">大衣</nut-radio></nut-cell>
        <nut-cell title="羽绒服"> <nut-radio label="羽绒服" shape="button">羽绒服</nut-radio></nut-cell>
        <nut-cell> <nut-radio label="外套" shape="button">外套</nut-radio></nut-cell>
        <nut-cell> <nut-radio label="外套" shape="button">外套</nut-radio></nut-cell>
        <nut-cell> <nut-radio label="外套" shape="button">外套</nut-radio></nut-cell>
        <nut-cell> <nut-radio label="外套" shape="button">外套</nut-radio></nut-cell>
        <nut-cell> <nut-radio label="外套" shape="button">外套</nut-radio></nut-cell>
        <nut-cell> <nut-radio label="外套" shape="button">外套</nut-radio></nut-cell>
        <nut-cell> <nut-radio label="外套" shape="button">外套</nut-radio></nut-cell>
        <nut-cell> <nut-radio label="外套" shape="button">外套</nut-radio></nut-cell>
        <nut-cell> <nut-radio label="外套" shape="button">外套</nut-radio></nut-cell>
        <nut-cell> <nut-radio label="外套" shape="button">外套</nut-radio></nut-cell>
        <nut-cell> <nut-radio label="外套" shape="button">外套</nut-radio></nut-cell>
        <nut-cell> <nut-radio label="外套" shape="button">外套</nut-radio></nut-cell>
        <nut-cell> <nut-radio label="外套" shape="button">外套</nut-radio></nut-cell>
        <nut-cell> <nut-radio label="外套" shape="button">外套</nut-radio></nut-cell>
        <nut-cell> <nut-radio label="外套" shape="button">外套</nut-radio></nut-cell>
      </nut-radio-group>
      </scroll-view>
      </view>
    </nut-popup>

    <nut-popup position="bottom" v-model:visible="checkColorShow" closeable >
      <nut-cell>  <nut-tag>上装</nut-tag></nut-cell>
      <nut-radio-group v-model="dynamicForm.state.type">
        <nut-cell> <nut-radio label="黑色系" shape="button">黑色系</nut-radio></nut-cell>
        <nut-cell> <nut-radio label="白色系" shape="button">白色系</nut-radio></nut-cell>
      </nut-radio-group>

    </nut-popup>
  </view>

</template>

<style scoped lang="scss">

</style>