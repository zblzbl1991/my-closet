<script setup lang="ts">
import Tabbar from "../../component/index.vue";
import {onMounted, reactive, Ref, ref, UnwrapRef} from "vue";
import dayjs from "dayjs";
import {getChartsData, save} from "@/pages/time/index";
import * as echarts from '../../ec-canvas/echarts';
import {getCurrentInstance} from '@tarojs/taro'
import {request} from "../../service/request";
import {timeList} from "../../api/closetApi";


//图表

const chartData=ref([])
const ec = reactive({
  // onInit:initChart
  lazyLoad: true
})
const ecCanvasRef = ref(null)

const refresh = function (option, value: Ref<UnwrapRef<string>>) {
  if (!ecCanvasRef.value) {
    console.error("未获取到ec")
    return
  }
  const { page } = getCurrentInstance()
  let selectComponent = page.selectComponent('#mychart');
  selectComponent?.init((canvas, width, height, canvasDpr) => {

    const chart = echarts.init(canvas, null, {
      width: width,
      height: height,
      devicePixelRatio: canvasDpr // new
    })
    canvas.setChart(chart);
    console.log('canvas', canvas)
    console.log('option', option)
    chart.setOption(option);
  })
}
var option = ref({
  series: [

    {
      name: 'Area Mode',
      type: 'pie',
      radius: [20, 140],
      center: ['50%', '75%'],
      roseType: 'area',
      label:{
        overflow:'none'
      },
      itemStyle: {
        borderRadius: 5
      },
      data: [
        { value: 30, name: 'rose 1' },
        { value: 28, name: 'rose 2' },
        { value: 26, name: 'rose 3' },
        { value: 24, name: 'rose 4' },
        { value: 22, name: 'rose 5' },
        { value: 20, name: 'rose 6' },
        { value: 18, name: 'rose 7' },
        { value: 16, name: 'rose 8' }
      ]
    }
  ]
});

const onClick = () => {
  showRight.value = true
};
const show = ref(false)
const min = new Date(2020, 0, 1)
const max = new Date()
const val = ref(new Date())
const confirm = ({selectedValue}) => {

  var arraySupport = require("dayjs/plugin/arraySupport");
  dayjs.extend(arraySupport);
  let day = dayjs(selectedValue);
  day = day.subtract(1, 'month')
  let format = day.format('YYYY-MM-DD HH:mm');

  formData[curTimePoint.value] = format
  show.value = false
  console.log(formData)
}
const showRight = ref(false)
//表单
const formData = reactive({
  name: '',
  description: '',
  startTime: '',
  endTime: '',
})
const formRef = ref(null)

const submit = () => {
  formRef.value?.validate().then(({valid, errors}) => {
    if (valid) {
      console.log('success:', formData)
      save(formData)
    } else {
      console.warn('error:', errors)
    }
  })
}

const clickTime = function (timeStr) {
  show.value = true
  curTimePoint.value = timeStr
}
const curTimePoint = ref('')
const formatter = (type, option) => {
  switch (type) {
    case 'year':
      option.text += '年'
      break
    case 'month':
      option.text += '月'
      break
    case 'day':
      option.text += '日'
      break
    case 'hour':
      option.text += '时'
      break
    case 'minute':
      option.text += '分'
      break
    default:
      option.text += ''
  }
  return option
}

//tab栏切换
const handlerChange =function (res) {
  tabList.value=[]
  getData(res.paneKey)

}
const value = ref('DAY');

const tabList =ref([])
onMounted(()=>{
  getData(value.value)

  setTimeout(()=>{

    // option.value.series[0].data=chartData.value
    refresh(option.value,value)
  }, 1000)
})
const getData = (type) => {
  request({
    url:`${timeList}`,
    data:{
      type:type
    },
    success: function (res) {
      console.log(res.data.data)
      tabList.value=res.data.data
      getChartsData(chartData)
      // dataList.value=res.data.data
    }
  })
};
const getResult =function (item) {
  const length= item.closetList.length
  let res=0
  if(item.closetList.length>0){
    res = item.closetList.map(closet=>closet.price).reduce((total, num) => total + num);
  }
  return `${length} | ￥${res} >`
}
</script>

<template>


  <nut-navbar title="我的时间" desc="记录" @click-right="onClick"></nut-navbar>
  <nut-tabs @change="handlerChange" v-model="value" auto-height>
    <nut-tab-pane title="按日" pane-key="DAY" style="height: 500px">
<!--      <nut-cell v-for="item in tabList" :title="item.typeName" :desc="getResult(item)"></nut-cell>-->
      <ec-canvas class="container" id="mychart" ref="ecCanvasRef" canvas-id="mychart" :ec="ec"></ec-canvas>
    </nut-tab-pane>
    <nut-tab-pane title="按月" pane-key="MONTH">
      <nut-cell v-for="item in tabList" :title="item.typeName" :desc="getResult(item)"></nut-cell>
    </nut-tab-pane>
    <nut-tab-pane title="按年" pane-key="YEAR">
      <nut-cell v-for="item in tabList" :title="item.typeName" :desc="getResult(item)"></nut-cell>
    </nut-tab-pane>
  </nut-tabs>
<!--  <ec-canvas class="container" id="mychart" ref="ecCanvasRef" canvas-id="mychart" :ec="ec"></ec-canvas>-->


  <nut-popup v-model:visible="showRight" position="right" :style="{ width: '70%', height: '100%' }">
    <nut-form ref="formRef" :model-value="formData">
      <nut-form-item label="事件" prop="name" required :rules="[{ required: true, message: '请填写事件' }]">
        <nut-input v-model="formData.name" placeholder="请输入事件" type="text"/>
      </nut-form-item>
      <nut-form-item label="详情">
        <nut-input v-model="formData.description" placeholder="请输入详情" type="text"/>
      </nut-form-item>
      <nut-form-item label="开始时间">
        <nut-input v-model="formData.startTime" readonly @click="clickTime('startTime')" placeholder="请输入开始时间"
                   type="text"/>
      </nut-form-item>
      <nut-form-item label="结束时间">
        <nut-input v-model="formData.endTime" readonly @click="clickTime('endTime')" placeholder="请输入结束时间"
                   type="text"/>
      </nut-form-item>
      <nut-space style="margin: 10px">
        <nut-button size="small" type="primary" @click="submit">提交</nut-button>
      </nut-space>
      <!--      <nut-form-item label="备注">-->
      <!--        <nut-textarea v-model="formData.info" placeholder="请输入备注" type="text" />-->
      <!--      </nut-form-item>-->
    </nut-form>

  </nut-popup>
  <nut-popup v-model:visible="show" position="bottom">
    <nut-date-picker
        v-model="val"
        type="datetime"
        :formatter="formatter"
        :min-date="min"
        :max-date="max"
        :three-dimensional="false"
        @confirm="confirm"
        :minute-step="5"
    ></nut-date-picker>
  </nut-popup>
  <Tabbar></Tabbar>
</template>
<style lang="scss">
:root,
page {
  --nut-cell-desc-color: black
}

.container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
}

</style>
<style scoped lang="scss">

</style>