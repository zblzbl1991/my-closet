<script setup lang="ts">
import {computed, onMounted, reactive, ref, toRaw, toRef} from 'vue';
import './index.scss'
import closetSeason from '../closet-season'
import closetColor from '@/pages/closet-color'
import closetBrand from '@/pages/closet-brand'
import closetType from '@/pages/closet-type'
import closetTag from '@/pages/closet-tag'
import {closetModel} from "@/types/closet/closetModel";
import {request} from "../../service/request";
import Taro from "@tarojs/taro";
import {useTokenStore} from "../../store/wechat";

const dynamicRefForm: any = ref(null);
const dynamicForm = {
  state: ref<closetModel>({
    id: null,
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
    remarks: '',
    images: []
  }),
  show: reactive({
    season: false
    //颜色
  }),

  methods: {
    submit() {
      dynamicRefForm.value.validate().then(({valid, errors}) => {
        if (valid) {
          console.log('success', dynamicForm);
          request({
            url: '/closet/save',
            method: "POST",
            data: dynamicForm.state.value,
            success: function (res) {
              console.log(res)
              Taro.navigateBack(/*{
                delta: 2
              }*/)
            }
          })
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
    init() {
      let params = Taro.getCurrentInstance().router.params;
      console.log(params)
      if (params.id) {
        request({
          url: '/closet/' + params.id,
          // method: "GET",
          // data: dynamicForm.state,
          success: function (res) {
            dynamicForm.state.value = res.data.data
            console.log(dynamicForm.state.value.images)
            for (let i = 0; i < dynamicForm.state.value.images.length; i++) {
              let img = dynamicForm.state.value.images[i];
              uploadList.value.push({
                uid: img.id,
                url:img.url,
                name:img.objectName,
                status:'success',
                percentage: 100,
                type: "image"
              })
            }

          }
        })
      }
    }
  }
};
const show = ref(false);
// const desc = ref('2022年05月10日');

const confirm = ({selectedValue, selectedOptions}) => {
  dynamicForm.state.value.purchaseDate = selectedOptions.map((option) => option.text).join('');
  checkDateShow.value = false
}

const checkDateShow = ref(false)
const checkTagShow = ref(false)

const priceShow = ref(false)

const customKey = reactive(['.']);

const uploadList = ref([])
const beforeXhrUpload = (taroUploadFile, options) => {
  //taroUploadFile  是 Taro.uploadFile ， 你也可以自定义设置其它函数
  options.url = process.env.TARO_APP_API + '/closet/uploadImg'
  console.log('options', options)
  const uploadTask = taroUploadFile({
    url: options.url,
    filePath: options.taroFilePath,
    fileType: options.fileType,
    header: {
      'Content-Type': 'multipart/form-data',
      'satoken':useTokenStore.val,
      ...options.headers
    }, //
    formData: options.formData,
    name: options.name,
    success(response: { errMsg; statusCode; data }) {
      if (options.xhrState == response.statusCode) {
        options.onSuccess?.(response, options);
        let imgUrl = JSON.parse(response.data).data;
        dynamicForm.state.value.images.push(imgUrl)
        console.log(uploadList.value)
      } else {
        options.onFailure?.(response, options);
      }
    },
    fail(e) {
      options.onFailure?.(e, options);
    }
  });
  options.onStart?.(options);
  uploadTask.progress((res) => {
    options.onProgress?.(res, options);
  });
  // uploadTask.abort(); // 取消上传任务
};
const onDelete = (obj) => {
  dynamicForm.state.value.images.splice(obj.index, 1);
  console.log('delete 事件触发', obj);
};
const minDate = new Date(2010, 0, 1);
const maxDate = new Date(2025, 10, 1);
const currentDate = new Date(2023, 5, 10, 10, 10);
onMounted(() => {
  dynamicForm.methods.init()

})
</script>
<template>
  <view>
    <nut-form :model-value="dynamicForm.state.value" ref="dynamicRefForm">

      <nut-form-item label="名称" prop="name" required :rules="[{ required: true, message: '请填写名称' }]">
        <nut-input class="nut-input-text" v-model="dynamicForm.state.value.name" placeholder="请输入名称" type="text"/>
      </nut-form-item>
      <nut-form-item label="分类" prop="type" required :rules="[{ required: true, message: '请填写分类' }]">
        <closetType v-model:state="dynamicForm.state"></closetType>
      </nut-form-item>
      <nut-form-item label="季节" prop="season" required :rules="[{ required: true, message: '请填写季节' }]">
        <closetSeason v-model:state="dynamicForm.state"></closetSeason>
      </nut-form-item>

      <nut-form-item label="颜色" prop="color" required :rules="[{ required: true, message: '请填写颜色' }]">
        <closetColor v-model:state="dynamicForm.state"></closetColor>
      </nut-form-item>
      <!--      <nut-form-item label="收纳位置" prop="type" required :rules="[{ required: true, message: '请填写收纳位置' }]">-->
      <!--        <nut-input class="nut-input-text" v-model="dynamicForm.state.position" placeholder="请输入收纳位置"-->
      <!--                   type="text"/>-->
      <!--      </nut-form-item>-->
      <nut-form-item label="品牌" prop="brand" required :rules="[{ required: true, message: '请填写品牌' }]">
        <closetBrand v-model:state="dynamicForm.state"></closetBrand>
      </nut-form-item>
      <nut-form-item label="价格(￥)" prop="price" required :rules="[{ required: false, message: '请填写价格' }]">
        <nut-input class="nut-input-text" v-model="dynamicForm.state.value.price" @click="priceShow =true"
                   readonly
                   placeholder="请输入价格" type="digit"/>
        <nut-number-keyboard v-model:visible="priceShow" :custom-key="customKey" type="rightColumn"
                             :title="dynamicForm.state.value.price" v-model="dynamicForm.state.value.price"
                             maxlength="6"
                             @close="priceShow=false"></nut-number-keyboard>
      </nut-form-item>
      <nut-form-item label="尺码" prop="size" required :rules="[{ required: false, message: '请填写尺码' }]">
        <nut-input class="nut-input-text" v-model="dynamicForm.state.value.size"

                   placeholder="请输入尺码"/>
        <!--        <nut-number-keyboard v-model:visible="sizeShow" :custom-key="customSizeKey" type="rightColumn" :title="dynamicForm.state.size" v-model="dynamicForm.state.size" maxlength="6" @close="sizeShow=false"> </nut-number-keyboard>-->
      </nut-form-item>
      <nut-form-item label="购买日期" prop="purchaseDate" required
                     :rules="[{ required: false, message: '请填写购买日期' }]">
        <nut-input class="nut-input-text" v-model="dynamicForm.state.value.purchaseDate" @click="checkDateShow =true"
                   readonly
                   placeholder="请选择购买日期"/>

      </nut-form-item>
      <nut-form-item label="标签" prop="tag" :rules="[{ required: false, message: '请填写标签' }]">
        <closetTag  v-model:state="dynamicForm.state"></closetTag>
      </nut-form-item>
      <nut-form-item label="备注" prop="remarks" :rules="[{ required: false, message: '请填写备注' }]">
        <nut-input class="nut-input-text" v-model="dynamicForm.state.value.remarks" placeholder="请输入备注"
                   type="text"/>
      </nut-form-item>
      <nut-uploader :before-xhr-upload="beforeXhrUpload" v-model:file-list="uploadList"
                    @delete="onDelete"></nut-uploader>
      <nut-cell>
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
  </view>

</template>

<style scoped lang="scss">

</style>