import {request} from "../../service/request";
import {clockIn} from "../../api/closetApi";
import Taro from "@tarojs/taro";

export const savePoint = function (chooseLocation) {
    //{errMsg: "chooseLocation:ok", name: "陆家嘴金融贸易区星聚会KTV(三林印象城店)", address: "上海市浦东新区世纪大道", latitude: 31.22114, longitude: 121.54409}
    request({
        url: clockIn,
        data: {
            name: chooseLocation.name,
            address: chooseLocation.address,
            longitude:chooseLocation.longitude,
            latitude:chooseLocation.latitude,

        },
        method: 'POST',
        success: function (res) {
           console.log(res)
            Taro.showToast({
                title: '打卡成功',
                icon: 'none',
                duration: 2000
            })
        }
    })
}