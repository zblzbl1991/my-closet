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

const chartData = ref([])
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
  const {page} = getCurrentInstance()
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
// 各状态的颜色
var colors = ['red', 'orange'];
// 状态
var state = ['正常', '繁忙'];
var optionLine = ref({

  color: colors,
  tooltip: {
    formatter: function (params) {
      return params.value[1].substr(11) + '~' + params.value[2].substr(11);
    }
  },
  legend: {
    data: state,
    bottom: '1%',
    selectedMode: false, // 图例设为不可点击
    textStyle: {
      color: '#000'
    }
  },
  grid: {
    left: '3%',
    right: '3%',
    top: '1%',
    bottom: '10%',
    containLabel: true
  },
  xAxis: {
    // type: 'time',
    // //设置横坐标标签格式
    // axisLabel: {
    //   formatter: function (value) {
    //     var date = new Date(value);
    //     return getzf(date.getHours()) + ':' + getzf(date.getMinutes());
    //     function getzf(num) {
    //       if (parseInt(num) < 10) {
    //         num = '0' + num;
    //       }
    //       return num;
    //     }
    //   }
    // }
  },
  yAxis: {
    type: 'time',
    //设置横坐标标签格式
    axisLabel: {
      formatter: function (value) {
        var date = new Date(value);
        return getzf(date.getHours()) + ':' + getzf(date.getMinutes());
        function getzf(num) {
          if (parseInt(num) < 10) {
            num = '0' + num;
          }
          return num;
        }
      }
    }
    // data: state
  },
  series: [
    // 用空bar来显示图例
    { name: state[0], type: 'bar', data: [] },
    { name: state[1], type: 'bar', data: [] },
    {
      type: 'custom',
      renderItem: function (params, api) {
        //开发者自定义的图形元素渲染逻辑，是通过书写 renderItem 函数实现的
        var categoryIndex = api.value(0); //这里使用 api.value(0) 取出当前 dataItem 中第一个维度的数值。
        var start = api.coord([api.value(1), categoryIndex]); // 这里使用 api.coord(...) 将数值在当前坐标系中转换成为屏幕上的点的像素值。
        var end = api.coord([api.value(2), categoryIndex]);
        var height = 170;

        return {
          type: 'rect', // 表示这个图形元素是矩形。还可以是 'circle', 'sector', 'polygon' 等等。
          shape: echarts.graphic.clipRectByRect(
              {
                // 矩形的位置和大小。
                x: start[0],
                y: start[1] - height / 2,
                width: end[0] - start[0],
                height: height
              },
              {
                // 当前坐标系的包围盒。
                x: params.coordSys.x,
                y: params.coordSys.y,
                width: params.coordSys.width,
                height: params.coordSys.height
              }
          ),
          style: api.style()
        };
      },
      encode: {
        x: [1, 2],
        y: 0
      },
      data: [
        {
          //0表示正常；1表示繁忙
          value: [0, '2021-11-18 05:54:32', '2021-11-18 06:05:32'],
          itemStyle: {
            color: colors[0]
          }
        },
        {
          value: [1, '2021-11-18 06:05:32', '2021-11-18 07:15:32'],
          itemStyle: {
            color: colors[1]
          }
        },
        {
          value: [0, '2021-11-18 07:15:32', '2021-11-18 10:15:59'],
          itemStyle: {
            color: colors[0]
          }
        }
      ]
    }
  ]
});
var optionCicle = ref({
  series: [

    {
      name: 'Area Mode',
      type: 'pie',
      radius: [20, 140],
      center: ['50%', '75%'],
      roseType: 'area',
      label: {
        overflow: 'none'
      },
      itemStyle: {
        borderRadius: 5
      },
      data: [
        {value: 30, name: 'rose 1'},
        {value: 28, name: 'rose 2'},
        {value: 26, name: 'rose 3'},
        {value: 24, name: 'rose 4'},
        {value: 22, name: 'rose 5'},
        {value: 20, name: 'rose 6'},
        {value: 18, name: 'rose 7'},
        {value: 16, name: 'rose 8'}
      ]
    }
  ]
})

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
const handlerChange = function (res) {
  tabList.value = []
  getData(res.paneKey)

}
const tabValue = ref('DAY');
const tabRowValue = ref('');

const tabList = ref([])
const tabRows=ref([])
onMounted(() => {
  getData(tabValue.value)


})
const getData = (type) => {
  request({
    url: `${timeList}`,
    data: {
      type: type
    },
    success: function (res) {
      tabList.value = res.data.data
      tabRows.value=[]
      for (var key in tabList.value){
        tabRows.value.push(key)
        //add your statement to get key value
      }
      tabRowValue.value=tabRows.value[0]
      // console.log('tabRowValue.value',tabRowValue.value)
      // getChartsData(chartData)
      setTimeout(() => {
        if (type === 'DAY') {
          console.log('tabList.value[tabRowValue.value]',tabList.value[tabRowValue.value])
          let yAxis = tabList.value[tabRowValue.value].map(item=>item.startTime);
          let value = tabList.value[tabRowValue.value].map(item=>item.value);
          console.log('yAxis',yAxis)
          console.log('value',value)
          // optionLine.value.yAxis.data=yAxis
          // optionLine.value.series[0].data=value
          refresh(optionLine.value, tabValue)
        } else {
          refresh(optionCicle.value, tabValue)
        }
        // option.value.series[0].data=chartData.value

      }, 1000)
      // dataList.value=res.data.data
    }
  })
};
const getResult = function (item) {
  const length = item.closetList.length
  let res = 0
  if (item.closetList.length > 0) {
    res = item.closetList.map(closet => closet.price).reduce((total, num) => total + num);
  }
  return `${length} | ￥${res} >`
}
</script>

<template>


  <nut-navbar title="我的时间" desc="记录" @click-right="onClick"></nut-navbar>
  <nut-tabs @change="handlerChange" v-model="tabValue" auto-height>
    <nut-tab-pane title="按日" pane-key="DAY" style="height: 500px">
      <!--      左右切换-->
      <nut-tabs class="tabPane"  v-model="tabRowValue" direction="vertical" title-scroll name="tabName">
        <nut-tab-pane  v-for="item in tabRows" :key="item" :title="`${item}`" :pane-key="item">
          <ec-canvas class="container" id="mychart" ref="ecCanvasRef" canvas-id="mychart" :ec="ec"></ec-canvas>
        </nut-tab-pane>
      </nut-tabs>
      <!--      <nut-cell v-for="item in tabList" :title="item.typeName" :desc="getResult(item)"></nut-cell>-->
      <!--      <ec-canvas class="container" id="mychart" ref="ecCanvasRef" canvas-id="mychart" :ec="ec"></ec-canvas>-->
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
.tabPane{
  height: 500px;
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