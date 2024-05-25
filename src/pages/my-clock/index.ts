import {request} from "../../service/request";
import {clockIn, clockList} from "../../api/closetApi";
import Taro from "@tarojs/taro";
import {Ref, UnwrapRef} from "vue";

export const savePoint = function (chooseLocation, show: Ref<UnwrapRef<boolean>>) {
    console.log(chooseLocation)
    //{errMsg: "chooseLocation:ok", name: "陆家嘴金融贸易区星聚会KTV(三林印象城店)", address: "上海市浦东新区世纪大道", latitude: 31.22114, longitude: 121.54409}
    request({
        url: clockIn,
        data: {
            name: chooseLocation.name,
            address: chooseLocation.address,
            longitude: chooseLocation.longitude,
            latitude: chooseLocation.latitude,
            price: chooseLocation.price,
            rating: chooseLocation.rating

        },
        method: 'POST',
        success: function (res) {
            console.log(res)
            Taro.showToast({
                title: '打卡成功',
                icon: 'none',
                duration: 2000
            })
            show.value=false
        }
    })
}

export const getMarkers = function (markers: Ref<UnwrapRef<any[]>>, mapCtx: any) {
    request({
        url: clockList,
        data: {},
        method: 'GET',
        success: function (res) {
            console.log(res.data.data)
            for (let dataKey of res.data.data) {
                console.log(dataKey)
                markers.value.push({
                    id: dataKey.id,
                    longitude: dataKey.longitude,
                    latitude: dataKey.latitude,
                    width: 50,
                    height: 50,
                    label: {
                        content: dataKey.name
                    }
                })
                mapCtx.addMarkers({
                    markers: markers.value,
                    complete(res) {
                        console.log(res)
                    }
                })
            }
            // for (let i = 0; i < res.data.data.length; i++) {
            //
            // }

            // Taro.showToast({
            //     title: '打卡成功',
            //     icon: 'none',
            //     duration: 2000
            // })
        }
    })
}