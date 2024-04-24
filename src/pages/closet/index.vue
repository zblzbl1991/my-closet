<script setup lang="ts">
import {computed, onMounted, reactive, ref} from 'vue';
import './index.scss'
import closetSeason from './closet-season'
import closetColor from './closet-color'
import closetBrand from '@/pages/closet/closet-brand'
import closetSize from '@/pages/closet/closet-size'
import closetType from '@/pages/closet/closet-type'
import closetDate from '@/pages/closet/closet-date'
import closetTag from '@/pages/closet/closet-tag'
import {closetModel} from "@/types/closet/closetModel";
import {request} from "../../service/request";
import Taro from "@tarojs/taro";
import {beforeUpload, deleteCloset} from "@/pages/closet/index";
import {closetRecords} from "../../api/closetApi";
import dayjs from "dayjs";

const dynamicRefForm: any = ref(null);
const dynamicForm = {
  state: ref<closetModel>({
    id: null,
    //名称
    name: '',
    //分类
    type: '',
    color: [],
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
    images: [],
    //穿搭日
    days:'',
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
    statistic() {
      state.isVisible = true
      // calendarRef.value.scrollToDate(endDate);
      calendarRef.value.scrollToDate(dayjs().format("YYYY-MM-DD"));
    },
    reset() {
      console.log(dynamicRefForm.value)
      dynamicRefForm.value.reset();
    },
    delete(id: string) {
      deleteCloset(id)
    },
    init() {
      let params = Taro.getCurrentInstance().router.params;
      console.log(params)



      if (params.id) {
        request({
          url: '/closet/' + params.id,
          success: function (res) {
            dynamicForm.state.value = res.data.data

            for (let i = 0; i < dynamicForm.state.value.images.length; i++) {
              let img = dynamicForm.state.value.images[i];
              uploadList.value.push({
                uid: img.id,
                url: img.url,
                name: img.objectName,
                status: 'success',
                percentage: 100,
                type: "image"
              })
            }

            console.log(dynamicForm.state.value)

          }
        })
        getClosetDays(params.id);
      }
    }
  }
};
const   getClosetDays =function(id:string) {
  request({
    url: `${closetRecords}/${id}`,

    method: 'GET',
    success: function (res) {
      const arr = res.data.data.map(item => {
        return item.dateStr;
      })
      console.log('arr', arr)
      dynamicForm.state.value.days = arr
      console.log('arr', dynamicForm.state.value.days)
      state.date = state.date.concat(arr)
      // console.log('date',state.date)
    }
  })
}
const closeSwitch = (param) => {
  state[`${param}`] = false;
};
const setChooseValue = (param) => {
  // state.date = param[3];
  // state.dateWeek = param[4];
  let dateArr = param.map((item) => {
    return item[3];
  });
  state.date = [...dateArr];
  console.log('state', state)
  request({
    url: closetRecords,
    data: {
      closetId: dynamicForm.state.value.id,
      closetDates: state.date
    },
    method: 'POST',
    success: function (res) {
      params = Taro.getCurrentInstance().router.params
      getClosetDays(params.id);
    }
  })
};
const beforeXhrUpload = (taroUploadFile, options) => {
  beforeUpload(taroUploadFile, options, dynamicForm)

  // uploadTask.abort(); // 取消上传任务
};

const priceShow = ref(false)


const uploadList = ref([])

const onDelete = (obj) => {
  dynamicForm.state.value.images.splice(obj.index, 1);
};
const hideFn = () => {
  showPreview.value = false;
};

onMounted(() => {
  dynamicForm.methods.init()
})
const clickImg = function (url) {
  showPreview.value = true
  showImg.value = []
  const imgArr = dynamicForm.state.value.images.map(image => image.url)
  for (let i = 0; i < imgArr.length; i++) {
    showImg.value.push({src: imgArr[i]})
  }
}
const showPreview = ref(false)
const showImg = ref([])
const handleImg = function () {
  console.log('handler click')
}
const state = reactive({
  isVisible: false,
  date: [],
  dateWeek: '',
  date7: [],
});
const endDate = dayjs().format('YYYY-MM-DD');
const startDate = dayjs().subtract(1, 'month').format('YYYY-MM-DD');
const date = ref([startDate, endDate])

const calendarRef = ref(null);

const computedTotalPrice = computed(() => {
  console.log(state.date, dynamicForm.state.value.price)
  if (state.date && dynamicForm.state.value.price) {
    return dynamicForm.state.value.price / state.date.length
  } else {
    return '--'
  }
})
</script>
<template>
  <view>
    <view>
      <image
          style="width: 300px;height: 100px;background: #fff;margin:0 auto;display:block" mode="aspectFit"
          v-if="dynamicForm.state.value.images"
          :src="dynamicForm.state.value.images&&dynamicForm.state.value.images.length>0?dynamicForm.state.value.images[0].thumbUrl?dynamicForm.state.value.images[0].thumbUrl:dynamicForm.state.value.images[0].url:''"
          @click="handleImg" :onTap="clickImg"
      />
    </view>
    <nut-form :model-value="dynamicForm.state.value" ref="dynamicRefForm">

      <nut-form-item label="名称" prop="name" :rules="[{ required: false, message: '请填写名称' }]">
        <nut-input class="nut-input-text" v-model="dynamicForm.state.value.name" placeholder="请输入名称" type="text"/>
      </nut-form-item>
      <nut-form-item label="分类" prop="type" :rules="[{ required: false, message: '请填写分类' }]">
        <closetType v-model:state="dynamicForm.state"></closetType>
      </nut-form-item>
      <nut-form-item label="季节" prop="season" :rules="[{ required: false, message: '请填写季节' }]">
        <closetSeason v-model:state="dynamicForm.state"></closetSeason>
      </nut-form-item>

      <nut-form-item label="颜色" prop="color" :rules="[{ required: false, message: '请填写颜色' }]">
        <closetColor v-model:state="dynamicForm.state"></closetColor>
      </nut-form-item>
      <!--      <nut-form-item label="收纳位置" prop="type" required :rules="[{ required: true, message: '请填写收纳位置' }]">-->
      <!--        <nut-input class="nut-input-text" v-model="dynamicForm.state.position" placeholder="请输入收纳位置"-->
      <!--                   type="text"/>-->
      <!--      </nut-form-item>-->
      <nut-form-item label="品牌" prop="brand" :rules="[{ required: false, message: '请填写品牌' }]">
        <closetBrand v-model:state="dynamicForm.state"></closetBrand>
      </nut-form-item>
      <nut-form-item label="价格(￥)" prop="price" :rules="[{ required: false, message: '请填写价格' }]">
        <nut-input class="nut-input-text" v-model="dynamicForm.state.value.price" @click="priceShow =true"

                   placeholder="请输入价格" type="digit"/>
      </nut-form-item>
      <nut-form-item label="尺码" prop="size" :rules="[{ required: false, message: '请填写尺码' }]">
        <closetSize v-model:state="dynamicForm.state"></closetSize>
      </nut-form-item>
      <nut-form-item label="购买日期" prop="purchaseDate"
                     :rules="[{ required: false, message: '请填写购买日期' }]">
        <closetDate v-model:state="dynamicForm.state"></closetDate>
      </nut-form-item>
      <nut-form-item label="标签" prop="tag" :rules="[{ required: false, message: '请填写标签' }]">
        <closetTag v-model:state="dynamicForm.state"></closetTag>
      </nut-form-item>
      <nut-form-item label="备注" prop="remarks" :rules="[{ required: false, message: '请填写备注' }]">
        <nut-input class="nut-input-text" v-model="dynamicForm.state.value.remarks" placeholder="请输入备注"
                   type="text"/>
      </nut-form-item>
      <nut-form-item label="性价比(￥)" prop="totalPrice">
        <nut-input class="nut-input-text" v-model="computedTotalPrice" readonly

        />
      </nut-form-item>
      <nut-form-item label="穿搭日" prop="days" >
        <nut-tag plain type="primary" color="#E9E9E9" text-color="#999999" v-for="item in dynamicForm.state.value.days"> {{item}} </nut-tag>
      </nut-form-item>
      <nut-uploader :before-xhr-upload="beforeXhrUpload" v-model:file-list="uploadList"
                    @delete="onDelete"></nut-uploader>
      <nut-cell style="height:0px"></nut-cell>
      <nut-cell class="r">
        <nut-button type="info" style="margin-right: 10px" size="small" @click="dynamicForm.methods.submit">提交
        </nut-button>
        <nut-button type="info" style="margin-right: 10px" v-if="dynamicForm.state.value.id" size="small"
                    @click="dynamicForm.methods.statistic">统计
        </nut-button>
        <!--        <nut-button size="small" @click="dynamicForm.methods.reset">重置提示状态</nut-button>-->
        <nut-button size="small" type="danger" v-if="dynamicForm.state.value.id"
                    @click="dynamicForm.methods.delete(dynamicForm.state.value.id)">删除
        </nut-button>
      </nut-cell>
      <!--      <nut-navbar title="Title" left-show @click-back="dynamicForm.methods.submit" @click-right="dynamicForm.methods.delete(dynamicForm.state.value.id)"></nut-navbar>-->
    </nut-form>


    <nut-calendar
        ref="calendarRef"
        v-model:visible="state.isVisible"
        :default-value="state.date"
        @close="closeSwitch('isVisible')"
        @choose="setChooseValue"
        :start-date="date[0]"
        :end-date="date[1]"
        type="multiple"
    >
    </nut-calendar>

    <nut-image-preview :show="showPreview" :images="showImg" @close="hideFn"/>

  </view>

</template>
<style>
.r {
  position: fixed;
  bottom: 0;
  z-index: 100;
}

</style>
<style scoped lang="scss">

</style>