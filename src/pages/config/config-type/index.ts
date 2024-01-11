import Taro from "@tarojs/taro";
import {request} from "../../../service/request";
import {closetConfigLocation, closetConfigTypes} from "../../../api/closetApi";
import {toRef} from "vue";
import {useLocationsStore} from "../../../store/closet";

export const deleteType=function (id,locations){
    console.log('id',id)
    Taro.showModal({
        title: '提示',
        content: '是否删除？',
        success: function (res) {
            if (res.confirm) {
                request({
                    url:closetConfigTypes+'/'+id,
                    method:'DELETE',
                    success: function (res) {
                        console.log('useLocationsStore.val',useLocationsStore.val)
                        getLocations(useLocationsStore.val)
                    }
                })
                console.log('用户点击确定')
            } else if (res.cancel) {
                console.log('用户点击取消')
            }
        }
    })
}
export const addType = function (types) {
    console.log(types)
    types.push({})
}

export const getLocations = function (locations) {
    request({
        url: closetConfigLocation,
        method: "GET",
        data: {},
        success: function (res) {
            console.log(res)
            if(locations){

                locations.value = res.data.data
                console.log('当前部位：',locations)
            }
        }
    })
}
export const saveLocation = function (val,locations) {
    console.log(val,locations)
    request({
        url: closetConfigLocation,
        method: "POST",
        data: {
            name: val
        },
        success: function (res) {
            console.log(val)
            getLocations(useLocationsStore.val)
            // getLocations(locations)
        }
    })
}
export const deleteLocation = function (id) {
    Taro.showModal({
        title: '提示',
        content: '是否删除？',
        success: function (res) {
            if (res.confirm) {
                request({
                    url: `${closetConfigLocation}/${id}`,
                    method: "DELETE",
                    data: {
                        name: id
                    },
                    success: function (res) {
                        console.log('useLocationsStore.val',useLocationsStore.val)
                        getLocations(useLocationsStore.val)
                        // getLocations(locations)
                    }
                })
                console.log('用户点击确定')
            } else if (res.cancel) {
                console.log('用户点击取消')
            }
        }
    })

}