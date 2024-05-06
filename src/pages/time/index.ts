import {request} from "../../service/request";
import {saveTime, timeList} from "../../api/closetApi";
import Taro from "@tarojs/taro";
import {Ref, UnwrapRef} from "vue";


export const save = function (time) {
    //{errMsg: "chooseLocation:ok", name: "陆家嘴金融贸易区星聚会KTV(三林印象城店)", address: "上海市浦东新区世纪大道", latitude: 31.22114, longitude: 121.54409}
    request({
        url: saveTime,
        data: {
            name: time.name,
            description: time.description,
            startTime:time.startTime,
            endTime:time.endTime,

        },
        method: 'POST',
        success: function (res) {
           console.log(res)
            Taro.showToast({
                title: '保存成功',
                icon: 'none',
                duration: 2000
            })
        }
    })
}

export const getChartsData=function (chartData: Ref<UnwrapRef<any[]>>) {
    request({
        url: timeList,
        data: {


        },
        method: 'GET',
        success: function (res) {
            chartData.value=res.data.data
            console.log('chartData',chartData)
        }
    })
}
