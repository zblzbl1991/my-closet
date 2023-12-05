<script setup lang="ts">
import {computed, reactive, ref} from 'vue';
import './index.scss'
import {CheckNormal, IconFont} from "@nutui/icons-vue";

const dynamicRefForm = ref(null);
const dynamicForm = {
  state: reactive({
    //名称
    name: '',
    //分类
    type: '',
    //颜色
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
const seasonComputed = computed(() => {
  return dynamicForm.state.season.map((val) => val).join(',');
})
const tagComputed = computed(() => {
  return dynamicForm.state.tag.map((val) => val).join(',');
})
const checkSeasonShow = ref(false)
const checkTypeShow = ref(false)
const checkColorShow = ref(false)
const checkBrandShow = ref(false)
const checkDateShow = ref(false)
const checkTagShow = ref(false)

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
  // {
  //   title: 'H',
  //   list: [
  //     {
  //       name: '湖南',
  //       id: 5
  //     },
  //     {
  //       name: '湖北',
  //       id: 6
  //     }
  //   ]
  // }
]);

const clickItem = (key, item) => {
  console.log(key, item);
  dynamicForm.state.brand=item.name
};

const clickIndex = (key) => {
  console.log(key);
};
</script>
<template>
  <view>
    <nut-form :model-value="dynamicForm.state" ref="dynamicRefForm">

      <nut-form-item label="名称" prop="name" required :rules="[{ required: true, message: '请填写名称' }]">
        <nut-input class="nut-input-text" v-model="dynamicForm.state.name" placeholder="请输入名称" type="text"/>
      </nut-form-item>
      <nut-form-item label="分类" prop="type" required :rules="[{ required: true, message: '请填写分类' }]">
        <nut-input class="nut-input-text" v-model="dynamicForm.state.type" @click="checkTypeShow =true"
                   readonly
                   placeholder="请选择分类"/>
      </nut-form-item>
      <nut-form-item label="季节" prop="seasonComputed" required :rules="[{ required: true, message: '请填写季节' }]">
        <nut-input class="nut-input-text" v-model="seasonComputed" @click="checkSeasonShow =true"
                   readonly
                   placeholder="请选择季节"/>
      </nut-form-item>

      <nut-form-item label="颜色" prop="color" required :rules="[{ required: true, message: '请填写颜色' }]">
        <nut-input class="nut-input-text" v-model="dynamicForm.state.color" @click="checkColorShow =true"
                   readonly
                   placeholder="请选择颜色"/>
      </nut-form-item>
<!--      <nut-form-item label="收纳位置" prop="type" required :rules="[{ required: true, message: '请填写收纳位置' }]">-->
<!--        <nut-input class="nut-input-text" v-model="dynamicForm.state.position" placeholder="请输入收纳位置"-->
<!--                   type="text"/>-->
<!--      </nut-form-item>-->
      <nut-form-item label="品牌" prop="brand" required :rules="[{ required: true, message: '请填写品牌' }]">
        <nut-input class="nut-input-text" readonly @click="checkBrandShow =true" v-model="dynamicForm.state.brand" placeholder="请输入品牌" type="text"/>
      </nut-form-item>
      <nut-form-item label="价格" prop="price" required :rules="[{ required: true, message: '请填写价格' }]">
        <nut-input class="nut-input-text" v-model="dynamicForm.state.price" placeholder="请输入价格" type="text"/>
      </nut-form-item>
      <nut-form-item label="尺码" prop="size" required :rules="[{ required: true, message: '请填写尺码' }]">
        <nut-input class="nut-input-text" v-model="dynamicForm.state.size" placeholder="请输入尺码" type="text"/>
      </nut-form-item>
      <nut-form-item label="购买日期" prop="purchaseDate" required :rules="[{ required: true, message: '请填写购买日期' }]">
        <nut-input class="nut-input-text" v-model="dynamicForm.state.purchaseDate" @click="checkDateShow =true"
                   readonly
                   placeholder="请选择购买日期"/>

      </nut-form-item>
      <nut-form-item label="标签" prop="tag" required :rules="[{ required: false, message: '请填写标签' }]">
        <nut-input class="nut-input-text" v-model="tagComputed" @click="checkTagShow =true"
                   readonly
                   placeholder="请选择标签"/>
      </nut-form-item>
      <nut-form-item label="备注" prop="remarks" required :rules="[{ required: false, message: '请填写备注' }]">
        <nut-input class="nut-input-text" v-model="dynamicForm.state.remarks" placeholder="请输入备注" type="text"/>
      </nut-form-item>
      <nut-cell>
        <!--        <nut-button size="small" style="margin-right: 10px" @click="dynamicForm.methods.add">添加</nut-button>-->
        <!--        <nut-button size="small" style="margin-right: 10px" @click="dynamicForm.methods.remove">删除</nut-button>-->
        <nut-button type="primary" style="margin-right: 10px" size="small" @click="dynamicForm.methods.submit">提交
        </nut-button>
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
    <nut-popup position="bottom" v-model:visible="checkTypeShow" :catch-move="true" style="height: 50%">
      <!--      <nut-cell>  <nut-tag>上装</nut-tag></nut-cell>-->
      <scroll-view class="scroll-view_H" :scroll-y="true">
        <view>
          <nut-cell-group title="上装">
            <template #title>
              <nut-tag>上装</nut-tag>
            </template>
            <nut-cell>
              <nut-radio-group text-position="left" v-model="dynamicForm.state.type">
                <nut-radio label="大衣">大衣</nut-radio>
                <nut-radio label="羽绒服">羽绒服</nut-radio>
                <nut-radio label="外套">外套</nut-radio>

              </nut-radio-group>
            </nut-cell>
          </nut-cell-group>
          <nut-cell-group title="下装">
            <nut-cell>
              <nut-radio-group text-position="left" v-model="dynamicForm.state.type">
                <nut-radio label="牛仔裤">牛仔裤</nut-radio>
                <nut-radio label="喇叭裤">喇叭裤</nut-radio>
                <nut-radio label="短裤">短裤</nut-radio>

              </nut-radio-group>
            </nut-cell>
          </nut-cell-group>
          <nut-cell-group title="鞋子">
            <nut-cell>
              <nut-radio-group text-position="left" v-model="dynamicForm.state.type">
                <nut-radio label="皮鞋">皮鞋</nut-radio>
                <nut-radio label="凉鞋">凉鞋</nut-radio>
                <nut-radio label="旅游鞋">旅游鞋</nut-radio>

              </nut-radio-group>
            </nut-cell>
          </nut-cell-group>
          <nut-cell-group title="包包">
            <nut-cell>
              <nut-radio-group text-position="left" v-model="dynamicForm.state.type">
                <nut-radio label="皮包">皮包</nut-radio>
                <nut-radio label="帆布包">帆布包</nut-radio>
                <nut-radio label="托特包">托特包</nut-radio>

              </nut-radio-group>
            </nut-cell>
          </nut-cell-group>
        </view>
      </scroll-view>
    </nut-popup>

    <nut-popup position="bottom" v-model:visible="checkColorShow">
      <nut-cell-group>
        <nut-cell>
          <nut-radio-group v-model="dynamicForm.state.color">
            <nut-radio label="黑色系">黑色系<IconFont name="check-normal"  color="#000000"></IconFont ></nut-radio>
            <nut-radio label="白色系" >白色系<IconFont name="check-checked"  color="#FFFFFF"></IconFont ></nut-radio>
            <nut-radio label="红色系" >红色系<IconFont name="check-normal"  color="#FF0000"></IconFont ></nut-radio>
          </nut-radio-group>
        </nut-cell>
      </nut-cell-group>
    </nut-popup>
    <nut-popup position="bottom" v-model:visible="checkBrandShow">
          <nut-elevator :index-list="data" :height="260" @click-item="clickItem" @click-index="clickIndex">
            <template #default="slotProps">
<!--              <Jd width="12px"></Jd>-->
              <span :style="{ marginLeft: '15px' }">{{ slotProps.item.name }}</span>
            </template>
          </nut-elevator>
    </nut-popup>
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