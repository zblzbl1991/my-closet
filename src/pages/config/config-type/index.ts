import Taro from "@tarojs/taro";
import {request} from "../../../service/request";
import {closetConfigLocation, closetConfigTypes} from "../../../api/closetApi";

export const deleteType=function (id){
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
                        Taro.navigateBack(/*{
                delta: 2
              }*/)

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
            locations.value = res.data.data
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
            console.log(res)
            getLocations(locations)
        }
    })
}