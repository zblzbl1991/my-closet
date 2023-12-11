<script setup lang="ts">
import {computed, reactive, ref} from 'vue';
import './index.scss'
import closetSeason from '../closet-season'
import closetColor from '@/pages/closet-color'
import closetBrand from '@/pages/closet-brand'
import closetType from '@/pages/closet-type'
import {closetModel} from "../../../types/closet/closetModel";

const dynamicRefForm:any = ref(null);
const dynamicForm = {
  state: reactive<closetModel>({
    //名称
    name: '',
    //分类
    type: '',
    color: '',
    //收纳位置
    position: '',
    //季节
    season: [],
    //品牌
    brand: '',
    //价格
    price: '',
    //尺码
    size: '',
    //购买日期
    purchaseDate: '',
    //标签
    tag: [],
    //备注
    remarks: ''
  }),
  show:reactive({
    season:false
    //颜色
  }),

  methods: {
    submit() {
      dynamicRefForm.value.validate().then(({valid, errors}) => {
        if (valid) {
          console.log('success', dynamicForm);
        } else {
          // showToast.warn(errors[0].message);
          console.log('error submit!!', errors);
        }
      });
    },
    reset() {
      console.log(dynamicRefForm.value)
      dynamicRefForm.value.reset();
    },
  }
};
const show = ref(false);
// const desc = ref('2022年05月10日');
const minDate = new Date(2010, 0, 1);
const maxDate = new Date(2025, 10, 1);
const currentDate = new Date(2023, 5, 10, 10, 10);
const confirm = ({selectedValue, selectedOptions}) => {
  dynamicForm.state.purchaseDate = selectedOptions.map((option) => option.text).join('');
  checkDateShow.value=false
}
const tagComputed = computed(() => {
  return dynamicForm.state.tag.map((val) => val).join(',');
})
const checkDateShow = ref(false)
const checkTagShow = ref(false)

const priceShow =ref(false)

const customKey = reactive(['.']);
</script>
<template>
  <view>
    <nut-form :model-value="dynamicForm.state" ref="dynamicRefForm">

      <nut-form-item label="名称" prop="name" required :rules="[{ required: true, message: '请填写名称' }]">
        <nut-input class="nut-input-text" v-model="dynamicForm.state.name" placeholder="请输入名称" type="text"/>
      </nut-form-item>
      <nut-form-item label="分类" prop="type" required :rules="[{ required: true, message: '请填写分类' }]">
        <closetType v-model:state="dynamicForm.state"  ></closetType>
      </nut-form-item>
      <nut-form-item label="季节" prop="season" required :rules="[{ required: true, message: '请填写季节' }]">
        <closetSeason v-model:state="dynamicForm.state"  ></closetSeason>
      </nut-form-item>

      <nut-form-item label="颜色" prop="color" required :rules="[{ required: true, message: '请填写颜色' }]">
        <closetColor v-model:state="dynamicForm.state" ></closetColor>
      </nut-form-item>
<!--      <nut-form-item label="收纳位置" prop="type" required :rules="[{ required: true, message: '请填写收纳位置' }]">-->
<!--        <nut-input class="nut-input-text" v-model="dynamicForm.state.position" placeholder="请输入收纳位置"-->
<!--                   type="text"/>-->
<!--      </nut-form-item>-->
      <nut-form-item label="品牌" prop="brand" required :rules="[{ required: true, message: '请填写品牌' }]">
        <closetBrand v-model:state="dynamicForm.state" ></closetBrand>
      </nut-form-item>
      <nut-form-item label="价格(￥)" prop="price" required :rules="[{ required: true, message: '请填写价格' }]">
        <nut-input class="nut-input-text" v-model="dynamicForm.state.price" @click="priceShow =true"
                   readonly
                   placeholder="请输入价格" type="digit"/>
        <nut-number-keyboard v-model:visible="priceShow" :custom-key="customKey" type="rightColumn" :title="dynamicForm.state.price" v-model="dynamicForm.state.price" maxlength="6" @close="priceShow=false"> </nut-number-keyboard>
      </nut-form-item>
      <nut-form-item label="尺码" prop="size" required :rules="[{ required: true, message: '请填写尺码' }]">
        <nut-input class="nut-input-text" v-model="dynamicForm.state.size"

                   placeholder="请输入尺码" />
<!--        <nut-number-keyboard v-model:visible="sizeShow" :custom-key="customSizeKey" type="rightColumn" :title="dynamicForm.state.size" v-model="dynamicForm.state.size" maxlength="6" @close="sizeShow=false"> </nut-number-keyboard>-->
      </nut-form-item>
      <nut-form-item label="购买日期" prop="purchaseDate" required :rules="[{ required: true, message: '请填写购买日期' }]">
        <nut-input class="nut-input-text" v-model="dynamicForm.state.purchaseDate" @click="checkDateShow =true"
                   readonly
                   placeholder="请选择购买日期"/>

      </nut-form-item>
      <nut-form-item label="标签" prop="tag"  :rules="[{ required: false, message: '请填写标签' }]">
        <nut-input class="nut-input-text" v-model="tagComputed" @click="checkTagShow =true"
                   readonly
                   placeholder="请选择标签"/>
      </nut-form-item>
      <nut-form-item label="备注" prop="remarks"  :rules="[{ required: false, message: '请填写备注' }]">
        <nut-input class="nut-input-text" v-model="dynamicForm.state.remarks" placeholder="请输入备注" type="text"/>
      </nut-form-item>
      <nut-uploader :url="uploadUrl" v-model:file-list="defaultFileList" maximum="10" multiple list-type="list">
        <nut-button type="success" size="small">上传文件</nut-button>
      </nut-uploader>
      <nut-cell>
        <!--        <nut-button size="small" style="margin-right: 10px" @click="dynamicForm.methods.add">添加</nut-button>-->
        <!--        <nut-button size="small" style="margin-right: 10px" @click="dynamicForm.methods.remove">删除</nut-button>-->
        <nut-button type="primary" style="margin-right: 10px" size="small" @click="dynamicForm.methods.submit">提交
        </nut-button>
        <nut-button size="small" @click="dynamicForm.methods.reset">重置提示状态</nut-button>
      </nut-cell>
    </nut-form>





    <nut-popup position="bottom" v-model:visible="checkDateShow">
      <nut-date-picker
          v-model="currentDate"
          v-model:visible="show"
          :min-date="minDate"
          :max-date="maxDate"
          :is-show-chinese="true"
          :three-dimensional="false"
          @confirm="confirm"
      ></nut-date-picker>
    </nut-popup>
    <nut-popup position="bottom" v-model:visible="checkTagShow" closeable :style="{ height: '20%' }">
      <nut-checkbox-group v-model="dynamicForm.state.tag">
        <nut-checkbox label="好看" shape="button">好看</nut-checkbox>
        <nut-checkbox label="性价比高" shape="button">性价比高</nut-checkbox>
      </nut-checkbox-group>

    </nut-popup>
  </view>

</template>

<style scoped lang="scss">

</style>